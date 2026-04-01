# Naming convention

## Context

A consistent naming convention makes the code easier to understand and enhances the code maintainability in the long run.

## Decision

We follow the below naming conventions:

| Situation                               | Naming format        | Example                      | Note                                                             |
|-----------------------------------------|----------------------|------------------------------|------------------------------------------------------------------|
| Page components(Components with routes) | xxx.page.ts          | `design-system.page.ts`      | To make pages explict                                            |
| Pages with list data                    | xxx-list.page.ts     | `device-list.page.ts`        | To make lists explict                                            |
| Dialog components                       | xxx.dialog.ts        | `edit-device-name.dialog.ts` | To make dialogs explict                                          |
| Regular components                      | xxx.components.ts    | `spinner.component.ts`       |                                                                  |
| Directives                              | xxx.directive.ts     | `file-size.directive.ts`     |                                                                  |
| API clients                             | xxx.api.ts           | `device.api.ts`              | Contains both API calls and related data models                  |
| Store services                          | xxx-store.service.ts | `device-store.service.ts`    |                                                                  |
| Regular services                        | xxx.service.ts       | `feature-toggle.service.ts`  |                                                                  |
| Files containing data models            | xxx.model.ts         | `common.model.ts`            | Contains common data models shared across the whole application  |
| CSS classes                             | xxx-yyy              | `main-content`               | Use all lowercases with dashes                                   |
| CSS classes for assisting PrimeNG       | pa-xxx               | `pa-dialog-footer`           | Your own CSS selectors that work together with PrimeNG selectors |
| CSS variables                           | --xxx-yyy            | `--primary-text-color`       | Use all lowercases with dashes                                   |
| JS class names                          | AbcXyz               | `DeviceListPage`             |                                                                  |
| JS variable names                       | abcXyz               | `currentState`               |                                                                  |
| Utility class file names                | xxx.utils.ts         | `pagination.utils.ts`        |                                                                  |
| Configuration files                     | xxx.config.ts        | `route.config.ts`            |                                                                  |

The following principles should also be considered:

- When name folders, the name should exclude its context if its parent folder's name already covers the context meaning. For example, for `member/list-page`, the `list-page` sub folder should not include "member" like `member-list-page` because the parent folder `member` already conveys such context. This is for simpler folder structure.
- When name files, the name should include itw full context regardless of its containing folder structure. For example, for `member/list-page/member-list.page.ts`, the file name of `member-list.page.ts` should contain "member" even if it has a parent folder named `member`. This is for quick context targeting.
