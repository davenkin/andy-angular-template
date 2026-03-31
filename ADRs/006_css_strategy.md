# CSS strategy

## Context

In web development, CSS can easily get messed up if no strategies/principles are applied. We should have a clear strategy on how to arrange CSSs and implement them in a consistent manner.

## Decision

- We follow a consistent approach to decide where to put different types of CSS styles
- We use [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer) to control the priorities of different types of styles

## Implementation

#### Decide where to put CSS styles

CSS styles can roughly been split into the following categories:

- Styles that are specific to your own components
- Styles that apply globally and target PrimeNG components
- Styles that apply globally but does not target PrimeNG components
- Utilities styles that can be shared/referenced by all components

Normally you add your CSS styles in the following places:

- Your components' own CSS files: These files reside adjacent to your components' class files
- The `src/style` folder: This folder contains styles that are global or shared, with the following files:
  - `primeng/primeng-components.ts`: This file contains customization to PrimeNG's components using [PrimeNG's theming mechanism](https://primeng.org/theming)
  - `primeng/primeng-preset.ts`: This is the PrimeNG preset, normally you don't touch this file
  - `primeng/primeng-semantic.ts`: This file contains design token customization that are shared by all PrimeNG's components using PrimeNG's theming mechanism
  - `primeng/primeng-css.scss`: This file contains you own styles for customizing PrimeNG components if you cannot implement your customization using PrimeNG design tokens
  - Folders for individual PrimeNG components customization(e.g. `p-button`):
    - `p-button.ts`: Design tokens customization for individual PrimeNG component, should be prefered over `p-button.scss`
    - `p-button.scss`: CSS customization for individual PrimeNG component
  - `base.scss`: This file contains globally applied styles and CSS variables
  - `reset.scss`: This file contains global styles for [CSS reset](https://meyerweb.com/eric/tools/css/reset/), normally you don't touch this file
  - `utility.scss`: This file contains utility styles that can be shared/referenced by all components

When you try to add CSS styles, go through the following steps to decide where to put the styles. The red boxes are the
key decision points. There are multiple files related to PrimeNG customization, pay attention to the their applying
order. Basically, for customizing PrimeNG components, first use PrimeNG's built-in theming(design token) mechanism, only if
that fails to work then you add your CSS styles.

![how-to-decide-where-to-put-css-styles](../ADRs/asset/how-to-decide-where-to-put-css-styles.png)

Some examples when deciding where to put CSS styles:

- For setting `font-family` of the whole application, this is the base style which applies to the whole application and it's not just a PrimeNG concern, so the setting should be done in `base.scss`:
  ```
    body {
    font-family:
      'Arial', 'Helvetica', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', 'WenQuanYi Micro Hei',
      'STXihei', '华文细黑', 'Georgia', 'Times New Roman', 'sans-serif';
  }
  ```
- For setting the global primary color, as it applies to the whole application, and it can be achieved using PrimeNG's semantic design tokens, this should be configured in `primeng-semantic.ts`:
  ```
    colorScheme: {
      light: { 
        primary: {
          color: '{primary.600}', // setting global primary color
          // more...
        }
      }
    }

  ```
- For setting background color of `<p-button>`, PrimeNG preset has built-in support for this by configuring the `<p-button>` in `p-button.ts`:
  ```
    button: {
      colorScheme: {
      light: {
        root: {
          primary: {
            focusRing: {
              color: 'var(--primary-color)',
              shadow: 'none',
            },
          },
        },
      }
    }
  ```
- For setting pure icon `<p-button>`'s width and height to be the same size, this cannot be done by configuring PrimeNG's design tokens, so we need to do this inside the p-button's own customization file `p-button.scss`:
  ```
  // pure icon button
  button.p-button.p-button-icon-only {
    width: var(--medium-control-height);
    height: var(--medium-control-height);
    padding: 0;
  }
  ```

#### CSS layers

In practice, you don't quite need to touch css layers as they are already put in place for you. But a good understanding of the different layers' priority rules helps you better understand what's going on under the hood if you encounter some wired CSS issues.

The common principle for arranging css layers is: default global styles should be put as lowest, followed by 3rd party components libraries(such as PrimeNG), and your own component's styles(which are unlayered) should be of highest priority.

There are 6 CSS layers, from lowest priority to highest priority:

1. `reset`: CSS reset, used only in `reset.scss`
2. `base`: Base global styles, used only in `base.scss`
3. `primeng`: PrimeNG design tokens fall into this layer, such as `primeng-preset.ts`, `primeng-primitive.ts`, `primeng-semantic.ts` and `primeng-components.ts`. Other customization files, such as `primeng-css.scss`, do not belong to this layer but `primeng-css` layer
4. `primeng-css`: CSS styles for customizing PrimeNG components if design tokens cannot meet our requirements
5. `utility`: Utility styles in `utility.scss`
6. unlayered: Your own components' styles

![css-layer-order.png](../ADRs/asset/css-layer-order.png)

The CSS layers priority is configured by `theme.options.cssLayer.order` in `main.config.ts`:

```typescript
    providePrimeNG({
      theme: {
        preset: preset,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'reset, base, primeng, primeng-css, utility',
          },
        },
      },
    }),
```
