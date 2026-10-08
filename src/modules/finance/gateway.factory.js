// VEDIC TREE OS — Payment Gateway Factory & Registry
// Resolves payment gateway adapters dynamically without hard-coding providers into the domain.

import { MockPaymentGateway } from './gateways/mock.gateway.js';
import { RazorpayGatewayAdapter } from './gateways/razorpay.gateway.js';
import { StripeGatewayAdapter } from './gateways/stripe.gateway.js';

export class PaymentGatewayRegistry {
  constructor() {
    this.gateways = new Map();
    // Register standard adapters
    this.register('MOCK', new MockPaymentGateway());
    this.register('MANUAL', new MockPaymentGateway());
    this.register('RAZORPAY', new RazorpayGatewayAdapter());
    this.register('STRIPE', new StripeGatewayAdapter());
  }

  register(providerCode, gatewayInstance) {
    this.gateways.set(providerCode.toUpperCase(), gatewayInstance);
  }

  getGateway(providerCode = 'MOCK') {
    const code = (providerCode || 'MOCK').toUpperCase();
    const gateway = this.gateways.get(code);
    if (!gateway) {
      throw new Error(`PAYMENT_GATEWAY_NOT_FOUND: No registered payment gateway for provider '${providerCode}'.`);
    }
    return gateway;
  }

  /**
   * Automatically select best gateway according to currency and region
   */
  resolveGatewayForTransaction(currency = 'INR', requestedProvider = null) {
    if (requestedProvider) {
      return this.getGateway(requestedProvider);
    }
    if (currency.toUpperCase() === 'INR') {
      return this.getGateway('RAZORPAY');
    }
    return this.getGateway('STRIPE');
  }
}

export const defaultGatewayRegistry = new PaymentGatewayRegistry();
