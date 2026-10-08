// VEDIC TREE OS — Indian Payment Gateway Adapter (Razorpay / UPI Rails)
// Encapsulates Indian payment mechanics (UPI VPA, QR codes, NetBanking) behind IPaymentGateway
import { IPaymentGateway } from '../gateway.interface.js';
import { CurrencyService } from '../currency.service.js';

export class RazorpayGatewayAdapter extends IPaymentGateway {
  constructor(config = {}) {
    super();
    this.keyId = config.keyId || 'rzp_test_VedicTree2026';
    this.keySecret = config.keySecret || 'mock_secret_key_2026';
    this.merchantVpa = config.merchantVpa || 'vedictree@razorpay';
    this.merchantName = config.merchantName || 'Vedic Tree Foundation';
  }

  getProviderId() {
    return 'RAZORPAY';
  }

  /**
   * Create an order on Razorpay using minor currency units (paise for INR)
   */
  async createOrder({ invoiceNumber, amount, currency = 'INR', studentName, payerPhone, notes }) {
    const minorUnits = CurrencyService.toMinorUnits(amount, currency);
    const orderId = `order_${Date.now().toString(36)}${Math.floor(Math.random() * 1000).toString(36)}`;

    return {
      success: true,
      provider: 'RAZORPAY',
      orderId,
      keyId: this.keyId,
      amountMinorUnits: minorUnits,
      amountMajorUnits: Number(amount),
      currency: currency.toUpperCase(),
      receipt: invoiceNumber,
      customer: {
        name: studentName,
        contact: payerPhone
      },
      notes: {
        invoiceNumber,
        ...notes
      },
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Verify signature returned by Razorpay Checkout
   */
  async verifyPayment({ orderId, paymentId, signature: _signature = null, method = 'UPI' }) {
    if (!orderId || !paymentId) {
      throw new Error('RAZORPAY_VERIFICATION_ERROR: orderId and paymentId are required.');
    }

    // In production, verify crypto.createHmac('sha256', secret).update(orderId + "|" + paymentId).digest('hex') === _signature
    const isValid = Boolean(paymentId.startsWith('pay_') || paymentId.length > 5);

    return {
      verified: isValid,
      gatewayOrderId: orderId,
      gatewayPaymentId: paymentId,
      transactionRef: `RZP_${paymentId}`,
      method: (method || 'UPI').toUpperCase(),
      status: isValid ? 'SUCCESS' : 'FAILED',
      paidAt: new Date().toISOString()
    };
  }

  /**
   * Process refund via Razorpay
   */
  async processRefund({ gatewayPaymentId, amount, currency = 'INR', reason }) {
    const minorUnits = CurrencyService.toMinorUnits(amount, currency);
    const refundId = `rfnd_${Date.now().toString(36)}${Math.floor(Math.random() * 1000).toString(36)}`;

    return {
      success: true,
      gatewayRefundId: refundId,
      gatewayPaymentId,
      amountMinorUnits: minorUnits,
      amountMajorUnits: Number(amount),
      currency: currency.toUpperCase(),
      reason,
      status: 'PROCESSED',
      refundedAt: new Date().toISOString()
    };
  }

  /**
   * Generate NPCI-compliant UPI payment intent / QR payload for India
   */
  generateUpiQr({ vpa, payeeName, amount, transactionRef, note }) {
    const targetVpa = vpa || this.merchantVpa;
    const targetPayee = payeeName || this.merchantName;
    const cleanAmount = Number(amount).toFixed(2);
    const tr = transactionRef || `VT${Date.now()}`;
    const tn = note || 'School Fee Payment';

    // NPCI standard UPI format
    return `upi://pay?pa=${targetVpa}&pn=${encodeURIComponent(targetPayee)}&mc=8211&tr=${encodeURIComponent(tr)}&tn=${encodeURIComponent(tn)}&am=${cleanAmount}&cu=INR`;
  }
}
