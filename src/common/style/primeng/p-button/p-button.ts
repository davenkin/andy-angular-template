import { ButtonDesignTokens } from '@primeuix/themes/types/button';

export const button: ButtonDesignTokens = {
  root: {
    focusRing: {
      width: 'var(--2px)',
      style: 'solid',
      offset: 'var(--2px)',
    },
    label: {
      fontWeight: '500',
    },
  },
  colorScheme: {
    light: {
      root: {
        primary: {
          focusRing: {
            color: 'var(--primary-color)',
            shadow: 'none',
          },
        },
        secondary: {
          color: 'var(--text-secondary-color)',
          focusRing: {
            color: 'var(--primary-color)',
            shadow: 'none',
          },
        },
        warn: {
          background: 'var(--warn-orange-color)',
          borderColor: 'var(--warn-orange-color)',
          hoverBackground: `{orange.700}`,
          hoverBorderColor: `{orange.700}`,
          focusRing: {
            color: 'var(--primary-color)',
            shadow: 'none',
          },
        },
        danger: {
          background: 'var(--error-red-color)',
          borderColor: 'var(--error-red-color)',
          hoverBackground: `{red.700}`,
          hoverBorderColor: `{red.700}`,
          focusRing: {
            color: 'var(--primary-color)',
            shadow: 'none',
          },
        },
        info: {
          background: 'var(--sky-main)',
          borderColor: 'var(--sky-main)',
          focusRing: {
            color: 'var(--primary-color)',
            shadow: 'none',
          },
        },
        success: {
          background: 'var(--safe-green-color)',
          borderColor: 'var(--safe-green-color)',
          hoverBackground: `{green.700}`,
          hoverBorderColor: `{green.700}`,
          focusRing: {
            color: 'var(--primary-color)',
            shadow: 'none',
          },
        },
      },
      text: {
        secondary: {
          color: 'var(--text-secondary-color)',
        },
        warn: {
          color: 'var(--warn-orange-color)',
        },
        danger: {
          color: 'var(--error-red-color)',
        },
      },
      outlined: {
        primary: {
          color: 'var(--primary-color)',
          borderColor: 'var(--primary-color)',
        },
        secondary: {
          color: 'var(--text-secondary-color)',
          borderColor: 'var(--text-secondary-color)',
        },
        warn: {
          color: 'var(--warn-orange-color)',
          borderColor: 'var(--warn-orange-color)',
        },
        danger: {
          color: 'var(--error-red-color)',
          borderColor: 'var(--error-red-color)',
        },
      },
    },
  },
};
