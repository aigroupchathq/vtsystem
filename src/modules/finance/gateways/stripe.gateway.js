// VEDIC TREE OS — International Payment Gateway Adapter (Stripe Rails)
// Encapsulates multi-currency payment intents and card rails behind IPaymentGateway
import { IPaymentGateway } from '../gateway.interface.js';
import { CurrencyService } from '../currency.service.js';

export class StripeGatewayAdapter extends IPaymentGateway {
  constructor(config = {}) {
    super();
    this.publishableKey = config.publishableKey || 'pk_test_VedicTreeGlobal';
    this.secretKey = config.secretKey || 'sk_test_VedicTreeSecret';
  }

  getProviderId() {
    return 'STRIPE';
  }

  async createOrder({ invoiceNumber, amount, currency = 'USD', studentName, notes }) {
    const minorUnits = CurrencyService.toMinorUnits(amount, currency);
    const intentId = `pi_${Date.now().toString(36)}_${Math.floor(Math.random() * 1000).toString(36)}`;
    const clientSecret = `${intentId}_secret_${Math.floor(Math.random() * 100000)}`;

    return {
      success: true,
      provider: 'STRIPE',
      orderId: intentId,
      clientSecret,
      publishableKey: this.publishableKey,
      amountMinorUnits: minorUnits,
      amountMajorUnits: Number(amount),
      currency: currency.toLowerCase(),
      metadata: {
        invoiceNumber,
        studentName,
        ...notes
      },
      createdAt: new Date().toISOString()
    };
  }

  async verifyPayment({ orderId, paymentId = null, method = 'CARD' }) {
    if (!orderId) {
      throw new Error('STRIPE_VERIFICATION_ERROR: orderId (PaymentIntent ID) is required.');
    }

    const effectiveChargeId = paymentId || `ch_${Date.now().toString(36)}`;
    return {
      verified: true,
      gatewayOrderId: orderId,
      gatewayPaymentId: effectiveChargeId,
      transactionRef: `STRIPE_${effectiveChargeId}`,
      method: (method || 'CARD').toUpperCase(),
      status: 'SUCCESS',
      paidAt: new Date().toISOString()
    };
  }

  async processRefund({ gatewayPaymentId, amount, currency = 'USD', reason }) {
    const minorUnits = CurrencyService.toMinorUnits(amount, currency);
    const refundId = `re_${Date.now().toString(36)}`;

    return {
      success: true,
      gatewayRefundId: refundId,
      gatewayPaymentId,
      amountMinorUnits: minorUnits,
      amountMajorUnits: Number(amount),
      currency: currency.toLowerCase(),
      reason,
      status: 'PROCESSED',
      refundedAt: new Date().toISOString()
    };
  }
}
