// VEDIC TREE OS — Currency Abstraction Service
// Encapsulates ISO-4217 currencies, integer minor-unit math, and localized formatting.
// Core domain remains completely currency and country agnostic.

export const SUPPORTED_CURRENCIES = {
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    decimalDigits: 2,
    numberingSystem: 'lakhs_crores', // 1,00,000 notation
    minorUnitName: 'paise'
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    decimalDigits: 2,
    numberingSystem: 'standard', // 100,000 notation
    minorUnitName: 'cents'
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    name: 'UAE Dirham',
    decimalDigits: 2,
    numberingSystem: 'standard',
    minorUnitName: 'fils'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    decimalDigits: 2,
    numberingSystem: 'standard',
    minorUnitName: 'pence'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    decimalDigits: 2,
    numberingSystem: 'standard',
    minorUnitName: 'cents'
  },
  SGD: {
    code: 'SGD',
    symbol: 'S$',
    name: 'Singapore Dollar',
    decimalDigits: 2,
    numberingSystem: 'standard',
    minorUnitName: 'cents'
  }
};

export class CurrencyService {
  /**
   * Get metadata for an ISO-4217 currency code
   */
  static getCurrency(code = 'INR') {
    const upper = (code || 'INR').toUpperCase();
    return SUPPORTED_CURRENCIES[upper] || {
      code: upper,
      symbol: `${upper} `,
      name: upper,
      decimalDigits: 2,
      numberingSystem: 'standard',
      minorUnitName: 'units'
    };
  }

  /**
   * Converts a major currency unit (e.g. ₹150.50) to integer minor units (15050 paise)
   * Prevents IEEE-754 floating-point drift in arithmetic.
   */
  static toMinorUnits(amount, currencyCode = 'INR') {
    const meta = this.getCurrency(currencyCode);
    const multiplier = Math.pow(10, meta.decimalDigits);
    return Math.round(Number(amount) * multiplier);
  }

  /**
   * Converts integer minor units back to major units
   */
  static toMajorUnits(minorUnits, currencyCode = 'INR') {
    const meta = this.getCurrency(currencyCode);
    const divisor = Math.pow(10, meta.decimalDigits);
    return Number((Number(minorUnits) / divisor).toFixed(meta.decimalDigits));
  }

  /**
   * Format numerical amount with currency symbol and localized number system.
   * Supports Indian numbering (e.g. ₹1,50,000.00) vs International standard ($150,000.00).
   */
  static format(amount, currencyCode = 'INR', options = { showSymbol: true }) {
    const num = Number(amount) || 0;
    const meta = this.getCurrency(currencyCode);
    const symbol = options.showSymbol ? meta.symbol : '';

    if (meta.numberingSystem === 'lakhs_crores') {
      return `${symbol}${this.formatIndianNumber(num, meta.decimalDigits)}`;
    }

    // Standard International 3-digit comma format
    const formatted = num.toLocaleString('en-US', {
      minimumFractionDigits: meta.decimalDigits,
      maximumFractionDigits: meta.decimalDigits
    });
    return `${symbol}${formatted}`;
  }

  /**
   * Formats numbers according to the Indian numbering system (Lakhs & Crores)
   * Example: 150000 -> 1,50,000.00 | 12000000 -> 1,20,00,000.00
   */
  static formatIndianNumber(num, decimalDigits = 2) {
    const isNegative = num < 0;
    const absolute = Math.abs(num);
    const fixed = absolute.toFixed(decimalDigits);
    const [intPart, decPart] = fixed.split('.');

    if (intPart.length <= 3) {
      return `${isNegative ? '-' : ''}${intPart}.${decPart}`;
    }

    // Last 3 digits
    const lastThree = intPart.slice(-3);
    const remaining = intPart.slice(0, -3);

    // Remaining digits grouped by 2
    const formattedRemaining = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    const formattedInt = `${formattedRemaining},${lastThree}`;

    return `${isNegative ? '-' : ''}${formattedInt}.${decPart}`;
  }

  /**
   * Parse a formatted currency string back to standard number
   */
  static parse(formattedStr) {
    if (!formattedStr) return 0;
    const cleaned = String(formattedStr).replace(/[^0-9.-]/g, '');
    const val = parseFloat(cleaned);
    return isNaN(val) ? 0 : val;
  }
}
