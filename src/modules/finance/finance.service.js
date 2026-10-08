// VEDIC TREE OS — Finance & Fee Collection Service
// Orchestrates fee structures, invoicing, discounts/scholarships, payments, receipts, refunds, and aging.

import { db } from '../../database/db.js';
import { defaultGatewayRegistry } from './gateway.factory.js';
import { LedgerService } from './ledger.service.js';

export class FinanceService {
  // ----------------------------------------------------
  // FEE STRUCTURE MANAGEMENT
  // ----------------------------------------------------
  static listFeeStructures(context, filters = {}) {
    return db.getFeeStructures(context, filters);
  }

  static createFeeStructure(context, data) {
    if (!data.name || !data.gradeId) {
      throw new Error('VALIDATION_ERROR: Structure name and gradeId are mandatory.');
    }
    return db.createFeeStructure(context, data);
  }

  // ----------------------------------------------------
  // DISCOUNTS & SCHOLARSHIPS
  // ----------------------------------------------------
  static listDiscountRules(context, filters = {}) {
    return db.getDiscountRules(context, filters);
  }

  static createDiscountRule(context, data) {
    if (!data.name || !data.value) {
      throw new Error('VALIDATION_ERROR: Discount rule name and value are required.');
    }
    return db.createDiscountRule(context, data);
  }

  static listScholarships(context, studentId = null) {
    return db.getScholarships(context, studentId);
  }

  static grantScholarship(context, data) {
    if (!data.studentId || !data.amount) {
      throw new Error('VALIDATION_ERROR: Student and amount are required for scholarship.');
    }
    return db.grantScholarship(context, data);
  }

  /**
   * Calculates applicable concessions for a student based on fee items and concession rules
   */
  static calculateConcession({ items = [], discountRules = [], scholarships = [] }) {
    const computedItems = items.map(item => {
      const baseAmount = Number(item.amount) || 0;
      let itemDiscount = 0;

      // Only tuition components qualify for percentage concessions in standard institutional policy
      if (item.component === 'TUITION') {
        for (const rule of discountRules) {
          if (rule.type === 'PERCENTAGE') {
            const disc = (baseAmount * rule.value) / 100;
            itemDiscount += disc;
          } else if (rule.type === 'FIXED_AMOUNT') {
            itemDiscount += Math.min(baseAmount, rule.value);
          }
        }
      }

      itemDiscount = Math.min(baseAmount, itemDiscount);

      return {
        ...item,
        discountAmount: Number(itemDiscount.toFixed(2)),
        payableAmount: Number((baseAmount - itemDiscount).toFixed(2))
      };
    });

    // Apply scholarship credits to payable amounts (preferring TUITION components)
    let remainingScholarship = scholarships.reduce((sum, sch) => sum + (Number(sch.amount) || 0), 0);
    const finalItems = computedItems.map(item => {
      if (remainingScholarship > 0 && item.payableAmount > 0) {
        const deduction = Math.min(item.payableAmount, remainingScholarship);
        remainingScholarship -= deduction;
        return {
          ...item,
          discountAmount: Number((item.discountAmount + deduction).toFixed(2)),
          payableAmount: Number((item.payableAmount - deduction).toFixed(2))
        };
      }
      return item;
    });

    const totalDiscount = finalItems.reduce((sum, item) => sum + item.discountAmount, 0);

    return {
      computedItems: finalItems,
      totalDiscount: Number(totalDiscount.toFixed(2))
    };
  }

  // ----------------------------------------------------
  // INVOICE CREATION & MANAGEMENT
  // ----------------------------------------------------
  static listInvoices(context, filters = {}) {
    return db.getInvoices(context, filters);
  }

  static getInvoiceById(context, invoiceId) {
    return db.getInvoiceById(context, invoiceId);
  }

  static generateInvoice(context, params) {
    const { studentId, items = [], discountRuleIds = [], lateFeeTotal = 0, dueDate, notes, currency = 'INR' } = params;
    
    // Retrieve discount rules if specified
    const activeDiscounts = (discountRuleIds || []).map(id => 
      db.getDiscountRules(context).find(r => r.id === id)
    ).filter(Boolean);

    // Retrieve active student scholarships
    const studentScholarships = db.getScholarships(context, studentId).filter(s => s.status === 'ACTIVE');

    // Run concessions calculation
    const { computedItems } = this.calculateConcession({
      items,
      discountRules: activeDiscounts,
      scholarships: studentScholarships
    });

    return db.createInvoice(context, {
      studentId,
      lineItems: computedItems,
      additionalDiscount: 0,
      lateFeeTotal: Number(lateFeeTotal) || 0,
      dueDate,
      notes,
      currency
    });
  }

  // ----------------------------------------------------
  // PAYMENT COLLECTION & FAST POS COUNTER
  // ----------------------------------------------------
  static listPayments(context, filters = {}) {
    return db.getPayments(context, filters);
  }

  /**
   * Generate dynamic payment order or UPI QR intent for checkout
   */
  static async initiatePaymentOrder(context, { invoiceId, amount, method: _method = 'UPI', provider = null }) {
    const invoice = db.getInvoiceById(context, invoiceId);
    if (!invoice) throw new Error(`Invoice ${invoiceId} not found.`);

    const targetGateway = defaultGatewayRegistry.resolveGatewayForTransaction(invoice.currency, provider);
    const orderData = await targetGateway.createOrder({
      invoiceNumber: invoice.invoiceNumber,
      amount: amount || invoice.balanceAmount,
      currency: invoice.currency,
      studentName: invoice.studentName
    });

    let upiQrUri = null;
    if (invoice.currency === 'INR' && typeof targetGateway.generateUpiQr === 'function') {
      upiQrUri = targetGateway.generateUpiQr({
        amount: amount || invoice.balanceAmount,
        transactionRef: invoice.invoiceNumber,
        note: `Fee for ${invoice.studentName} (${invoice.invoiceNumber})`
      });
    }

    return {
      ...orderData,
      upiQrUri,
      gatewayProvider: targetGateway.getProviderId()
    };
  }

  /**
   * Finalize and record payment settlement at cashier desk or via gateway webhook
   */
  static async collectPayment(context, paymentParams) {
    const { invoiceId, amount, method = 'UPI', transactionRef, gatewayOrderId, gatewayPaymentId, gatewayProvider, payerName, payerPhone, remarks } = paymentParams;

    const invoice = db.getInvoiceById(context, invoiceId);
    if (!invoice) throw new Error(`Invoice ${invoiceId} not found.`);

    const effectiveAmount = Number(amount) || invoice.balanceAmount;

    // Verify transaction through gateway if gateway details provided
    if (gatewayOrderId && gatewayPaymentId && gatewayProvider && gatewayProvider !== 'MANUAL') {
      const gateway = defaultGatewayRegistry.getGateway(gatewayProvider);
      const verification = await gateway.verifyPayment({
        orderId: gatewayOrderId,
        paymentId: gatewayPaymentId,
        method
      });
      if (!verification.verified) {
        throw new Error('GATEWAY_PAYMENT_VERIFICATION_FAILED: Signature or payment confirmation could not be verified.');
      }
    }

    return db.recordPayment(context, {
      invoiceId,
      amount: effectiveAmount,
      currency: invoice.currency,
      method,
      transactionRef: transactionRef || `TXN-${Date.now()}`,
      gatewayProvider: gatewayProvider || (method === 'UPI' ? 'RAZORPAY' : 'MANUAL'),
      gatewayOrderId,
      gatewayPaymentId,
      payerName: payerName || invoice.studentName,
      payerPhone,
      remarks: remarks || 'Fast POS Counter collection'
    });
  }

  // ----------------------------------------------------
  // RECEIPTS & PRINTABLE AUDIT SLIPS
  // ----------------------------------------------------
  static listReceipts(context, filters = {}) {
    return db.getReceipts(context, filters);
  }

  static getReceiptById(context, receiptId) {
    return db.getReceiptById(context, receiptId);
  }

  // ----------------------------------------------------
  // REFUND PROCESSING
  // ----------------------------------------------------
  static listRefunds(context, filters = {}) {
    return db.getRefunds(context, filters);
  }

  static async issueRefund(context, refundParams) {
    const { paymentId, amount, reason, approverRemarks } = refundParams;
    const payment = db.getPayments(context).find(p => p.id === paymentId);
    if (!payment) throw new Error(`Payment ${paymentId} not found.`);

    // If gateway payment, dispatch refund through gateway adapter
    let gatewayRefundId = null;
    if (payment.gatewayPaymentId && payment.gatewayProvider && payment.gatewayProvider !== 'MANUAL') {
      const gateway = defaultGatewayRegistry.getGateway(payment.gatewayProvider);
      const refundResult = await gateway.processRefund({
        gatewayPaymentId: payment.gatewayPaymentId,
        amount,
        currency: payment.currency,
        reason
      });
      gatewayRefundId = refundResult.gatewayRefundId;
    }

    return db.processRefund(context, {
      paymentId,
      amount,
      reason,
      approverRemarks,
      gatewayRefundId
    });
  }

  // ----------------------------------------------------
  // OUTSTANDING AGING & DEFAULTERS
  // ----------------------------------------------------
  static getOutstandingAgingReport(context, campusId = null) {
    return db.getOutstandingAging(context, campusId);
  }

  // ----------------------------------------------------
  // INSTITUTIONAL DOUBLE-ENTRY TRIAL BALANCE
  // ----------------------------------------------------
  static getTrialBalanceReport(context, campusId = null) {
    return LedgerService.getTrialBalance(context, campusId);
  }

  static verifyDoubleEntryInvariant(context, campusId = null) {
    return LedgerService.verifyBalanceInvariant(context, campusId);
  }
}
