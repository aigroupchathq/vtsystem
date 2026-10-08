// VEDIC TREE OS — Module 04: Finance + Fees Comprehensive Test Suite
// Rigorous verification of numerical precision, currency abstraction, payment gateway abstraction,
// dynamic UPI rails, invoicing, concessions, receipts, refunds, aging, double-entry ledger invariants, and tenant isolation.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { db } from '../src/database/db.js';
import { CurrencyService } from '../src/modules/finance/currency.service.js';
import { defaultGatewayRegistry } from '../src/modules/finance/gateway.factory.js';
import { RazorpayGatewayAdapter } from '../src/modules/finance/gateways/razorpay.gateway.js';
import { StripeGatewayAdapter } from '../src/modules/finance/gateways/stripe.gateway.js';
import { LedgerService } from '../src/modules/finance/ledger.service.js';
import { FinanceService } from '../src/modules/finance/finance.service.js';

describe('MODULE 04: FINANCE + FEES ARCHITECTURE & CALCULATIONS', () => {
  const banerContext = {
    userId: 'usr-principal-baner',
    userName: 'Dr. Meenakshi Sundaram',
    userRole: 'PRINCIPAL',
    campusId: 'cmp-pune-baner',
    organizationId: 'org-vedic-tree-foundation'
  };

  const kothrudContext = {
    userId: 'usr-principal-kothrud',
    userName: 'Kothrud Admin',
    userRole: 'PRINCIPAL',
    campusId: 'cmp-pune-kothrud',
    organizationId: 'org-vedic-tree-foundation'
  };

  const hqContext = {
    userId: 'usr-hq-admin',
    userName: 'Raghav Sharma',
    userRole: 'HQ_ADMIN',
    campusId: null,
    organizationId: 'org-vedic-tree-foundation'
  };

  beforeEach(() => {
    db.reset();
  });

  // ========================================================
  // 1. CURRENCY ABSTRACTION & PRECISION ARITHMETIC
  // ========================================================
  describe('1. Currency Abstraction & Numerical Precision', () => {
    it('accurately converts major units to integer minor units without float drift', () => {
      // Test INR (Paise)
      assert.equal(CurrencyService.toMinorUnits(150.50, 'INR'), 15050);
      assert.equal(CurrencyService.toMinorUnits(120000.00, 'INR'), 12000000);
      assert.equal(CurrencyService.toMajorUnits(15050, 'INR'), 150.50);

      // Test USD (Cents)
      assert.equal(CurrencyService.toMinorUnits(99.99, 'USD'), 9999);
      assert.equal(CurrencyService.toMajorUnits(9999, 'USD'), 99.99);

      // Test AED (Fils)
      assert.equal(CurrencyService.toMinorUnits(450.25, 'AED'), 45025);
      assert.equal(CurrencyService.toMajorUnits(45025, 'AED'), 450.25);
    });

    it('formats Indian numbering system (Lakhs and Crores) correctly', () => {
      // 1 Lakh 50 Thousand
      const formattedLakh = CurrencyService.format(150000, 'INR');
      assert.equal(formattedLakh, '₹1,50,000.00');

      // 1 Crore 25 Lakhs 40 Thousand
      const formattedCrore = CurrencyService.format(12540000, 'INR');
      assert.equal(formattedCrore, '₹1,25,40,000.00');

      // Small amount
      assert.equal(CurrencyService.format(850.5, 'INR'), '₹850.50');
    });

    it('formats International currencies in standard 3-digit groupings', () => {
      assert.equal(CurrencyService.format(150000, 'USD'), '$150,000.00');
      assert.equal(CurrencyService.format(25000, 'GBP'), '£25,000.00');
      assert.equal(CurrencyService.format(30000, 'EUR'), '€30,000.00');
      assert.equal(CurrencyService.format(50000, 'AED'), 'AED 50,000.00');
      assert.equal(CurrencyService.format(75000, 'SGD'), 'S$75,000.00');
    });
  });

  // ========================================================
  // 2. PAYMENT GATEWAY ABSTRACTION & RAILS
  // ========================================================
  describe('2. Payment Gateway Abstraction & UPI Rails', () => {
    it('resolves correct gateway dynamically based on currency', () => {
      const inrGateway = defaultGatewayRegistry.resolveGatewayForTransaction('INR');
      assert.equal(inrGateway.getProviderId(), 'RAZORPAY');

      const usdGateway = defaultGatewayRegistry.resolveGatewayForTransaction('USD');
      assert.equal(usdGateway.getProviderId(), 'STRIPE');
    });

    it('creates Razorpay orders with integer minor units and generates valid NPCI UPI QR URI', async () => {
      const razorpay = new RazorpayGatewayAdapter();
      const order = await razorpay.createOrder({
        invoiceNumber: 'INV-2026-0001',
        amount: 60000,
        currency: 'INR',
        studentName: 'Kabir Deshmukh',
        payerPhone: '+91 98220 54321'
      });

      assert.equal(order.success, true);
      assert.equal(order.amountMinorUnits, 6000000); // 60,000 INR = 6,000,000 paise
      assert.equal(order.provider, 'RAZORPAY');

      const upiUri = razorpay.generateUpiQr({
        amount: 60000,
        transactionRef: 'INV-2026-0001',
        note: 'Term 1 Fee'
      });
      assert.ok(upiUri.includes('upi://pay?'));
      assert.ok(upiUri.includes('am=60000.00'));
      assert.ok(upiUri.includes('cu=INR'));
    });

    it('creates Stripe PaymentIntents for multi-currency international billing', async () => {
      const stripe = new StripeGatewayAdapter();
      const order = await stripe.createOrder({
        invoiceNumber: 'INV-GLOBAL-01',
        amount: 2500,
        currency: 'USD',
        studentName: 'Alexander Hayes'
      });

      assert.equal(order.success, true);
      assert.equal(order.provider, 'STRIPE');
      assert.equal(order.amountMinorUnits, 250000); // $2,500.00 = 250,000 cents
      assert.ok(order.clientSecret);
    });
  });

  // ========================================================
  // 3. FEE STRUCTURE, CONCESSIONS & INVOICING
  // ========================================================
  describe('3. Invoicing, Concessions & Late Fees Calculation', () => {
    it('calculates complex multi-component invoice with Sibling discount and late fee', () => {
      const invoice = FinanceService.generateInvoice(banerContext, {
        studentId: 'stu-aarav-sharma', // Aarav has no scholarships
        items: [
          { component: 'TUITION', title: 'Tuition Fee', amount: 80000 },
          { component: 'LAB', title: 'Robotics Lab', amount: 15000 },
          { component: 'TRANSPORT', title: 'Bus Fee', amount: 10000 }
        ],
        discountRuleIds: ['disc-sib-2'], // 15% off tuition = 12,000 discount
        lateFeeTotal: 1000,
        dueDate: '2026-10-15T00:00:00Z',
        currency: 'INR'
      });

      assert.equal(invoice.subtotal, 105000); // 80k + 15k + 10k
      assert.equal(invoice.discountTotal, 12000); // 15% of 80,000
      assert.equal(invoice.lateFeeTotal, 1000);
      assert.equal(invoice.totalAmount, 94000); // 105k - 12k + 1k
      assert.equal(invoice.balanceAmount, 94000);
      assert.equal(invoice.status, 'UNPAID');
    });

    it('correctly applies student scholarship deduction to invoice', () => {
      // Kabir Deshmukh has Founder's STEM Scholarship (₹25,000)
      const invoice = FinanceService.generateInvoice(banerContext, {
        studentId: 'stu-kabir-deshmukh',
        items: [
          { component: 'TUITION', title: 'Annual Tuition', amount: 100000 }
        ],
        discountRuleIds: [],
        currency: 'INR'
      });

      assert.equal(invoice.subtotal, 100000);
      assert.equal(invoice.discountTotal, 25000); // Deducted by scholarship
      assert.equal(invoice.totalAmount, 75000);
      assert.equal(invoice.balanceAmount, 75000);
    });
  });

  // ========================================================
  // 4. FAST POS CASHIER PAYMENT & RECEIPT ISSUANCE
  // ========================================================
  describe('4. Fast POS Counter Payment & Immutable Receipts', () => {
    it('processes partial payment, issues receipt, and updates invoice to PARTIALLY_PAID', async () => {
      // Invoice 2 has balance of 40,500
      const invoiceBefore = db.getInvoiceById(banerContext, 'inv-2026-002');
      assert.equal(invoiceBefore.balanceAmount, 40500);

      const result = await FinanceService.collectPayment(banerContext, {
        invoiceId: 'inv-2026-002',
        amount: 20000,
        method: 'UPI',
        transactionRef: 'UPI-TEST-998811',
        gatewayProvider: 'RAZORPAY',
        payerName: 'Raghav Sharma'
      });

      assert.equal(result.payment.status, 'SUCCESS');
      assert.equal(result.payment.amount, 20000);
      assert.match(result.receipt.receiptNumber, /^RCP-2026-\d{4}$/);
      assert.equal(result.invoice.balanceAmount, 20500); // 40,500 - 20,000
      assert.equal(result.invoice.status, 'PARTIALLY_PAID');
    });

    it('processes final settlement, transitioning invoice to PAID status', async () => {
      const result = await FinanceService.collectPayment(banerContext, {
        invoiceId: 'inv-2026-002',
        amount: 40500, // Pay complete remaining balance
        method: 'CASH',
        payerName: 'Raghav Sharma'
      });

      assert.equal(result.payment.status, 'SUCCESS');
      assert.equal(result.invoice.balanceAmount, 0);
      assert.equal(result.invoice.status, 'PAID');
    });

    it('rejects overpayment exceeding invoice balance', async () => {
      await assert.rejects(
        async () => {
          await FinanceService.collectPayment(banerContext, {
            invoiceId: 'inv-2026-002',
            amount: 999999, // Exceeds balance
            method: 'UPI'
          });
        },
        /OVERPAYMENT_ERROR/
      );
    });
  });

  // ========================================================
  // 5. REFUNDS & LEDGER REVERSALS
  // ========================================================
  describe('5. Refund Execution & Invoice Reopening', () => {
    it('processes partial refund against settled payment and updates invoice', async () => {
      // Payment 1 has amount 60,000 on Invoice 1 (which is currently PAID with 0 balance)
      const invBefore = db.getInvoiceById(banerContext, 'inv-2026-001');
      assert.equal(invBefore.balanceAmount, 0);
      assert.equal(invBefore.status, 'PAID');

      const refund = await FinanceService.issueRefund(banerContext, {
        paymentId: 'pay-2026-001',
        amount: 10000,
        reason: 'Extra lab kit fee waiver approved by Principal'
      });

      assert.equal(refund.status, 'PROCESSED');
      assert.match(refund.refundNumber, /^REF-2026-\d{4}$/);

      // Verify invoice was reopened
      const invAfter = db.getInvoiceById(banerContext, 'inv-2026-001');
      assert.equal(invAfter.paidAmount, 50000); // 60,000 - 10,000
      assert.equal(invAfter.balanceAmount, 10000);
      assert.equal(invAfter.status, 'PARTIALLY_PAID');
    });

    it('rejects refund amount exceeding payment amount', async () => {
      await assert.rejects(
        async () => {
          await FinanceService.issueRefund(banerContext, {
            paymentId: 'pay-2026-001',
            amount: 90000, // Exceeds payment amount of 60,000
            reason: 'Invalid excessive refund'
          });
        },
        /REFUND_EXCEEDS_PAYMENT/
      );
    });
  });

  // ========================================================
  // 6. DOUBLE-ENTRY ACCOUNTING INVARIANT
  // ========================================================
  describe('6. Double-Entry Accounting Invariant (Debits == Credits)', () => {
    it('maintains exact mathematical equality sum(Debits) === sum(Credits)', () => {
      const balanceCheck = LedgerService.verifyBalanceInvariant(banerContext, 'cmp-pune-baner');
      assert.equal(balanceCheck.isBalanced, true);
      assert.equal(balanceCheck.difference, 0);
      assert.equal(balanceCheck.totalDebited, balanceCheck.totalCredited);
    });

    it('generates a balanced institutional trial balance report', () => {
      const trialBalance = LedgerService.getTrialBalance(banerContext, 'cmp-pune-baner');
      assert.equal(trialBalance.isBalanced, true);
      assert.ok(trialBalance.totalDebit > 0);
      assert.ok(trialBalance.totalCredit > 0);
      assert.ok(Math.abs(trialBalance.totalDebit - trialBalance.totalCredit) < 0.01);
    });
  });

  // ========================================================
  // 7. OUTSTANDING AGING & DEFAULTERS
  // ========================================================
  describe('7. Outstanding Aging Reports & Defaulter Buckets', () => {
    it('categorizes invoices into aging buckets (Current, 1-30, 31-60, 60+ days)', () => {
      const report = FinanceService.getOutstandingAgingReport(banerContext, 'cmp-pune-baner');
      
      assert.ok(report.grandTotalOutstanding > 0);
      assert.ok('current' in report.buckets);
      assert.ok('days1To30' in report.buckets);
      assert.ok('days31To60' in report.buckets);
      assert.ok('days60Plus' in report.buckets);

      // Invoice 3 (Siddharth Roy, 61,500 INR) was issued Aug 1 and due Aug 20 (over 40 days overdue)
      assert.ok(report.buckets.days31To60.count >= 1);
    });
  });

  // ========================================================
  // 8. MULTI-TENANT ISOLATION BARRIER
  // ========================================================
  describe('8. Multi-Tenant Campus Isolation Barrier', () => {
    it('prevents cross-campus principal from accessing foreign invoice or recording payment', async () => {
      // Invoice 1 belongs to Pune Baner. A principal from Kothrud campus must be blocked!
      assert.throws(
        () => {
          db.getInvoiceById(kothrudContext, 'inv-2026-001');
        },
        /CROSS_TENANT_ACCESS_DENIED/
      );

      await assert.rejects(
        async () => {
          await FinanceService.collectPayment(kothrudContext, {
            invoiceId: 'inv-2026-001',
            amount: 5000,
            method: 'CASH'
          });
        },
        /CROSS_TENANT_ACCESS_DENIED/
      );
    });

    it('allows HQ_ADMIN to view all campuses invoices across the organization', () => {
      const allInvoices = db.getInvoices(hqContext);
      assert.ok(allInvoices.length >= 3);
    });
  });
});
