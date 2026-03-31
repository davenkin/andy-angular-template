import { ToastDesignTokens } from '@primeuix/themes/types/toast';

export const toast: ToastDesignTokens = {
  root: {
    borderWidth: 'var(--1px)',
    width: 'var(--600px)',
  },
  content: {
    padding: 'var(--18px)',
  },
  colorScheme: {
    light: {
      info: {
        borderColor: 'transparent',
        color: 'var(--primary-color)',
      },
      success: {
        borderColor: 'transparent',
        color: 'var(--success-color)',
      },
      warn: {
        borderColor: 'transparent',
        color: 'var(--warn-color)',
      },
      error: {
        borderColor: 'transparent',
        color: 'var(--error-color)',
      },
    },
  },
};
