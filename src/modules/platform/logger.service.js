// VEDIC TREE OS — Structured JSON / Context Logger

export class Logger {
  static formatMessage(level, context, message, meta = {}) {
    return {
      timestamp: new Date().toISOString(),
      level,
      context,
      message,
      ...meta
    };
  }

  static info(context, message, meta) {
    const formatted = this.formatMessage('INFO', context, message, meta);
    console.log(`[VT-OS INFO] [${context}] ${message}`, meta || '');
    return formatted;
  }

  static warn(context, message, meta) {
    const formatted = this.formatMessage('WARN', context, message, meta);
    console.warn(`[VT-OS WARN] [${context}] ${message}`, meta || '');
    return formatted;
  }

  static error(context, message, error) {
    const formatted = this.formatMessage('ERROR', context, message, {
      errorCode: error?.code,
      stack: error?.stack
    });
    console.error(`[VT-OS ERROR] [${context}] ${message}`, error);
    return formatted;
  }
}
