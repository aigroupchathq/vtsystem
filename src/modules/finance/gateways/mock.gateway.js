// VEDIC TREE OS — Mock Sandbox Payment Gateway
import { IPaymentGateway } from '../gateway.interface.js';

export class MockPaymentGateway extends IPaymentGateway {
  getProviderId() {
    return 'MOCK';
  }

  async createOrder({ invoiceNumber, amount, currency = 'INR', studentName: _studentName = null }) {
    const orderId = `mock_order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return {
      success: true,
      provider: 'MOCK',
      orderId,
      amount,
      currency,
      invoiceNumber,
      clientSecret: `mock_secret_${orderId}`,
      createdAt: new Date().toISOString()
    };
  }

  async verifyPayment({ orderId, paymentId = null, method = 'UPI' }) {
    const effectivePaymentId = paymentId || `mock_pay_${Date.now()}`;
    return {
      verified: true,
      transactionRef: `MOCK_TXN_${Date.now()}`,
      gatewayPaymentId: effectivePaymentId,
      gatewayOrderId: orderId,
      method: method.toUpperCase(),
      status: 'SUCCESS',
      paidAt: new Date().toISOString()
    };
  }

  async processRefund({ gatewayPaymentId, amount, currency = 'INR', reason }) {
    return {
      success: true,
      gatewayRefundId: `mock_rfnd_${Date.now()}`,
      gatewayPaymentId,
      amount,
      currency,
      reason,
      status: 'PROCESSED',
      refundedAt: new Date().toISOString()
    };
  }

  generateUpiQr({ vpa = 'vedictree@icici', payeeName = 'Vedic Tree Foundation', amount, transactionRef, note = 'School Fee' }) {
    const cleanAmount = Number(amount).toFixed(2);
    const encodedPayee = encodeURIComponent(payeeName);
    const encodedNote = encodeURIComponent(note);
    const encodedRef = encodeURIComponent(transactionRef || `VT-${Date.now()}`);
    return `upi://pay?pa=${vpa}&pn=${encodedPayee}&am=${cleanAmount}&cu=INR&tr=${encodedRef}&tn=${encodedNote}`;
  }
}
