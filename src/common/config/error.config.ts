import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { ToastService } from 'common/service/toast.service';
import { TranslateService } from '@ngx-translate/core';

export function apiResponseErrorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const keycloak = inject(Keycloak);
  const toastService = inject(ToastService);
  const translate = inject(TranslateService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        keycloak.login();
      }
      if (error.status === 403) {
        toastService.error(translate.instant('API_DEFAULT_ERROR_CODES.ACCESS_DENIED'));
      }
      return throwError(() => error);
    }),
  );
}
