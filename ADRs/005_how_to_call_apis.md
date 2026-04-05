# How to call APIs

## Context

API calls should be done in an organized and consistent manner.

## Decision

We follow a consistent convention regarding where to put various APIs and data models.

## Implementation

- All API calls should be categorised base on business/domain and grouped into API files with naming convention `xxx.api.ts`, for example:
  - For device related APIs, put them in `device.api.ts`
  - For member related APIs, put them in `member.api.ts`
- API files should be put under the corresponding domain folder under `src/console` or `src/public`, for example:
  - For `device.api.ts`, put it under `src/console/device`
  - For `member.api.ts`, put it under `src/console/member`
- Data models should be put in 2 places:
  - For common/shared models, put them in `common/model` folder, such as `OsType` and `CpuArchitecture`
  - All other models should be put inside the domain specific API files, for example `QListedDemoDevice` should be placed inside `demo-device.api.ts`
- API calls should not contain business logic but only fulfilling the HTTP call itself.
- By default, JWT token are automatically added for all APIs by `includeBearerTokenInterceptor` in `auth.config.ts`, you can configure `AUTH_EXCLUDED_URLS` to explicitly exclude the JWT token for specific URLs.
- All API query requests model should extend `PageQuery`, such as:

  ```
  export interface ListDemoDevicesQuery extends PageQuery {
    osType?: OsType;
    cpuArchitecture?: CpuArchitecture;
  }
  ```

- Paged response should be wrapped into `PagedResponse`, such as:

  ```
  public fetchListedDemoDevices(query: ListDemoDevicesQuery): Observable<PagedResponse<QListedDemoDevice>> {}
  ```
- When call APIs, usually we need to show a loading spinner, please refer to [007_how_to_show_loading_spinner.md](./007_how_to_show_loading_spinner.md) 


### How to handle API errors
When API error occurs, you can show a toast indicating to the user of this error.

- If the error response is `StandardApiError`:
  - If you only need to show default error messages, then you just need to call `this.standardApiErrorService.showDefaultErrorMessage(errorResponse)`:
    ```typescript
        someApiCall().subscribe({
        error: (errorResponse: HttpErrorResponse) => {
          this.standardApiErrorService.showDefaultErrorMessage(errorResponse);
        },
      });
    ```
    You also need to make sure the error code has a mapping record under `API_DEFAULT_ERROR_MESSAGE` message key, for example for error code `MAINTENANCE_RECORD_NOT_FOUND`, the error code should be used as the message key to get the error message:
    ```json
      "API_DEFAULT_ERROR_MESSAGE": {
        "MAINTENANCE_RECORD_NOT_FOUND": "维保记录不存在"
      }
    ```
  - If you need to show custom error messages, then you need to handle the error explicitly, and you may or may not fall back to `this.standardApiErrorService.showDefaultErrorMessage(errorResponse)`:
    ```typescript
        someApiCall().subscribe({
        error: (errorResponse: HttpErrorResponse) => {
          switch (standardApiErrorTypeOf(errorResponse)) {
            case 'EQUIPMENT_NAME_ALREADY_EXISTS': {
              this.toastService.error(this.translate.instant('SOME_KEY.EQUIPMENT_NAME_ALREADY_EXISTS'));
              break;
            }
            default: {
              this.standardApiErrorService.showDefaultErrorMessage(errorResponse);
            }
          }
        },
      });
    ```
- If the error response is not `StandardApiError`, you need to handle it some other ways.
- For some global API errors that need to always show a toast to the user, the `apiResponseErrorInterceptor` handles this automatically, for example for `403: Access denied` error:
  ```typescript
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // ...
      if (error.status === 403) {
        toastService.error(translate.instant('ACCESS_DENIED'));
      }
      // ...
    }),
  );
  ```
  This also means that your own API error handling logic should not handle such global errors again.
