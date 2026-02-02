// This file contains customizations to primeng components
// This file is the first place you should resort to when customize primeng components, more detail please refer to "006-CSS strategy.md"

export const PRIMENG_COMPONENTS = {
  button: {
    root: {
      focusRing: {
        width: 'var(--2px)',
        style: 'solid',
        color: 'var(--primary-color)',
        offset: 'var(--2px)',
        shadow: 'none',
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
            color: 'var(--secondary-text-color)',
            focusRing: {
              color: 'var(--primary-color)',
              shadow: 'none',
            },
          },
          warn: {
            background: 'var(--warn-color)',
            borderColor: 'var(--warn-color)',
            focusRing: {
              color: 'var(--primary-color)',
              shadow: 'none',
            },
          },
          danger: {
            background: 'var(--error-color)',
            borderColor: 'var(--error-color)',
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
            background: 'var(--green-main)',
            borderColor: 'var(--green-main)',
            focusRing: {
              color: 'var(--primary-color)',
              shadow: 'none',
            },
          },
        },
        text: {
          secondary: {
            color: 'var(--secondary-text-color)',
          },
          warn: {
            color: 'var(--warn-color)',
          },
          danger: {
            color: 'var(--error-color)',
          },
        },
        outlined: {
          primary: {
            color: 'var(--primary-color)',
            borderColor: 'var(--primary-color)',
          },
          secondary: {
            color: 'var(--secondary-text-color)',
            borderColor: 'var(--secondary-text-color)',
          },
          warn: {
            color: 'var(--warn-color)',
            borderColor: 'var(--warn-color)',
          },
          danger: {
            color: 'var(--error-color)',
            borderColor: 'var(--error-color)',
          },
        },
      },
    },
  },
  toast: {
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
  },
  tooltip: {
    root: {
      maxWidth: 'var(--600px)',
    },
  },
  paginator: {
    navButton: {
      borderRadius: 'var(--4px)',
    },
  },
};
