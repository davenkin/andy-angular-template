# How to show loading spinner

## Context

Loading spinners have various scopes:

- Spinners that cover the whole page
- Spinners that cover the main content area, excluding the navigation menu area
- Spinners that cover only a specific area, for example a dialog

## Decision

We uses `spinner.service.ts` to centrally manage all types of spinners.

## Implementation

- Usually you will use `SpinnerService.withGlobalSpinner()/SpinnerService.withConsoleMainSpinner()` to show spinners when calling APIs, for example:
  ```
  this.spinnerService.withGlobalSpinner(this.demoDeviceApi.fetchListedDemoDevices(query)).subscribe(...)
  ```
  where:
  - `withGlobalSpinner()` will show a spinner that covers the whole page, including the navigation menu area
  - `withConsoleMainSpinner()` will show a spinner that covers only the main content area

- If you want to show spinner for some specific area, use `SpinnerService.withSpinner()` together with your own `app-spinner` component, for example:
  ```
  this.spinnerService.withSpinner(demoDeviceSpinner, this.demoDeviceApi.fetchListedDemoDevices(query)).subscribe(...)
  ```
  and in the HTML template:
  ```
  <app-spinner [name]="demoDeviceSpinner"></app-spinner>
  ```

If you need more fine-grained control of when to show or hide spinners, you can also use the following APIs:
- Show global spinner: `SpinnerService.showGlobalSpinner()`
- Hide global spinner: `SpinnerService.hideGlobalSpinner()`
- Show main content spinner: `SpinnerService.showConsoleMainSpinner()`
- Hide main content spinner: `SpinnerService.hideConsoleMainSpinner()`
- Show spinner for a specific area: `SpinnerService.show(demoDeviceSpinner)`, this requires you add a `app-spinner`
  component explicitly into your component where you want to show the spinner.
  ```
  <app-spinner [name]="demoDeviceSpinner"></app-spinner>
  ```
- Hide spinner for a specific area: `SpinnerService.hide(demoDeviceSpinner)`
