/**
 * VEDIC TREE OS — Design System Tokens
 * 
 * Semantic token architecture for enterprise education operating system.
 * Designed for clarity, restraint, and high-trust enterprise operations.
 * India-first, globally scalable.
 */

export const tokens = {
  colors: {
    // Vedic Heritage Primary (Deep Forest & Evergreen)
    brand: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#0F4C35', // Primary Vedic Tree Green
      950: '#0A2E20',
    },
    // Heritage Accent (Saffron Gold & Ochre Amber)
    accent: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B', // Primary Saffron Gold
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },
    // Enterprise Slate Neutrals (Calibrated for WCAG 2.2 AA/AAA)
    slate: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#475569', // Calibrated: passes WCAG AA on ivory (7.14:1)
      500: '#334155', // Calibrated: passes WCAG AAA on ivory (9.57:1)
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
      950: '#090D16',
    },
    // Semantic Functional Feedback & Typography
    semantic: {
      text: {
        primary: '#0B2F29',
        secondary: '#1E293B',
        muted: '#334E47',
        caption: '#334155',
        error: '#991B1B',
        warning: '#78350F',
        success: '#0F5132',
        info: '#075985',
        ai: '#581C87',
      },
      shell: {
        bg: '#0B2F29',
        activeNav: '#154E42',
        textPrimary: '#FFFFFF',
        textSecondary: '#F4EEDC',
        textMuted: '#CBD5E1',
        textAccent: '#DFC679',
      },
      success: {
        bg: '#F0FDF4',
        border: '#BBF7D0',
        text: '#0F5132',
        solid: '#16A34A',
      },
      warning: {
        bg: '#FFFBEB',
        border: '#FDE68A',
        text: '#78350F',
        solid: '#D97706',
      },
      danger: {
        bg: '#FEF2F2',
        border: '#FECACA',
        text: '#991B1B',
        solid: '#DC2626',
      },
      info: {
        bg: '#F0F9FF',
        border: '#BAE6FD',
        text: '#075985',
        solid: '#0284C7',
      },
      ai: {
        bg: '#FAF5FF',
        border: '#E9D5FF',
        text: '#581C87',
        solid: '#9333EA',
      },
    },
  },
  typography: {
    fontFamilies: {
      sans: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace",
      display: "'Plus Jakarta Sans', 'Inter', sans-serif",
      serif: "'Playfair Display', Georgia, serif",
    },
    fontSizes: {
      xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
      sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0' }],
      base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.01em' }],
      lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.015em' }],
      xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.02em' }],
      '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.03em' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.035em' }],
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  spacing: {
    0: '0px',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
  },
  radius: {
    none: '0px',
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
    elevated: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};
