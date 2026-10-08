// VEDIC TREE OS — Payment Gateway Provider Interface
// Abstraction layer ensuring zero vendor or country-specific coupling to core domain.

export class IPaymentGateway {
  /**
   * Unique identifier for the provider (e.g. 'MOCK', 'RAZORPAY', 'STRIPE')
   */
  getProviderId() {
    throw new Error('Method getProviderId() must be implemented.');
  }

  /**
   * Initialize a payment order with the gateway
   * @param {Object} params - { invoiceNumber, amount, currency, studentId, studentName, payerPhone, notes }
   * @returns {Promise<Object>} Gateway order metadata
   */
  async createOrder(_params) {
    throw new Error('Method createOrder() must be implemented.');
  }

  /**
   * Verify a completed payment transaction signature or webhook payload
   * @param {Object} _verificationData - { orderId, paymentId, signature, payload }
   * @returns {Promise<{ verified: boolean, transactionRef: string, method: string, amount: number }>}
   */
  async verifyPayment(_verificationData) {
    throw new Error('Method verifyPayment() must be implemented.');
  }

  /**
   * Process a refund with the gateway provider
   * @param {Object} _refundData - { paymentId, gatewayPaymentId, amount, currency, reason }
   * @returns {Promise<{ success: boolean, gatewayRefundId: string, status: string }>}
   */
  async processRefund(_refundData) {
    throw new Error('Method processRefund() must be implemented.');
  }

  /**
   * Generate a UPI URI / dynamic QR string for Indian digital payments (if supported)
   * @param {Object} _upiParams - { vpa, payeeName, amount, transactionRef, note }
   * @returns {string} UPI deep-link URI (upi://pay?...)
   */
  generateUpiQr(_upiParams) {
    throw new Error('Method generateUpiQr() not supported by this provider.');
  }
}
