import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'common/service/toast.service';
import { isStandardApiError, standardApiErrorOf } from 'common/utils/common.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { StandardApiError } from 'common/model/common.model';

@Injectable({ providedIn: 'root' })
export class StandardApiErrorService {
  private translate = inject(TranslateService);
  private toastService = inject(ToastService);

  public defaultHandleError(response: HttpErrorResponse, excludedErrorCodes?: string[]) {
    if (!isStandardApiError(response)) {
      return;
    }

    const apiError = standardApiErrorOf(response) as StandardApiError;
    if (excludedErrorCodes?.includes(apiError.code)) {
      return;
    }

    const messageKey = 'API_DEFAULT_ERROR_CODES.' + apiError.code;
    this.toastService.error(this.translate.instant(messageKey, apiError.data));
  }
}
