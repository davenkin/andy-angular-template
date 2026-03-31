# Common best coding practices

## Context

Some small pieces of common coding practices don't deserve a standalone ADR but still need to be aligned across the whole team.

## Decision

We decide use this ADR to list all the common coding practices in the below `Implementation` section.

## Implementation

- Favor [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties) over [SCSS variables](https://sass-lang.com/documentation/variables/) as CSS variables are built in support from CSS.
- Use [Standalone components](https://blog.angular-university.io/angular-standalone-components/), do not use [NgModules based components](https://angular.dev/guide/ngmodules/overview). Because standalone component is much more concise and is recommended by Angular team.
- The order of CSS should match the order of the element in HTML.
- When customize PrimeNG components styles, prefer customizing PrimeNG's preset(design tokens) over direct CSS styles.
- Methods for GET HTTP requests should be prefixed with `fetchXxx()`. Methods for POST/PUT/PATCH HTTP requests should express its business intent, such as `createUser()`, `updateEmail()`.
- All enum types use Typescript's `enum` and make the enum name the same as its value, for example:

```
export enum OsType {
  WINDOWS = 'WINDOWS',
  LINUX = 'LINUX',
  ANDROID = 'ANDROID',
  MACOS = 'MACOS',
}
```

- Prefer using Angular's built-in control flow blocks such as `@for`, `@if` and `@else` etc, don't use the old ones like `ngIf` or `ngFor` etc.
- For folder names, its parent context can be excluded, for example under folder `demo-device`, if there is a subfolder to hold device list pages, the subfolder name can just be `list-page`, no need to be `demo-device-list-page`. However, for component names you need to include its context, so under `demo-device/list-page` folder, the component file name for device list page should be `demo-device-list.page.ts` but not `list.page.ts`.
- All folder and file names should use singular form but not plural form, for example, use `device` but not `devices`.
- Prefer using [Angular Signal](https://angular.dev/guide/signals) together with `changeDetection: ChangeDetectionStrategy.OnPush,` to accomplish reactivity as this is Angular's official recommended approach.
- For Typescript modules, prefer using [named export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#using_named_exports) over [default export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export), because named export makes refactoring easier and makes module names more consistent.
