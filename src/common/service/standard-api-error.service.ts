import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'common/service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StandardApiError } from 'common/model/common.model';

@Injectable({ providedIn: 'root' })
export class StandardApiErrorService {
  private static readonly DEFAULT_EXCLUDED_ERROR_CODES = ['ACCESS_DENIED'];
  private translate = inject(TranslateService);
  private toastService = inject(ToastService);

  public showDefaultErrorMessage(response: HttpErrorResponse, excludedErrorCodes?: string[]) {
    if (!this.isStandardApiError(response)) {
      return;
    }

    const apiError = this.standardApiErrorOf(response) as StandardApiError;

    if (StandardApiErrorService.DEFAULT_EXCLUDED_ERROR_CODES.includes(apiError.code)) {
      return;
    }

    if (excludedErrorCodes?.includes(apiError.code)) {
      return;
    }

    const messageKey = 'API_DEFAULT_ERROR_MESSAGE.' + apiError.code;
    this.toastService.error(this.translate.instant(messageKey, apiError.data));
  }

  public isStandardApiError(response: any) {
    return (
      response instanceof HttpErrorResponse &&
      response.error?.error?.type &&
      response.error?.error?.timestamp &&
      response.error?.error?.path
    );
  }

  public standardApiErrorTypeOf(response: HttpErrorResponse) {
    if (!this.isStandardApiError(response)) {
      return null;
    }

    return response.error.error.type as string;
  }

  public standardApiErrorOf(response: HttpErrorResponse) {
    if (!this.isStandardApiError(response)) {
      return null;
    }

    return response.error.error as StandardApiError;
  }
}
