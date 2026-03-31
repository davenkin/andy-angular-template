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

- Paged response should wrapped into `PagedResponse`, such as:

```
public fetchListedDemoDevices(query: ListDemoDevicesQuery): Observable<PagedResponse<QListedDemoDevice>> {}
```
