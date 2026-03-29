export default {
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
};
