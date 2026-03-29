import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { FocusService } from 'common/service/focus.service';
import { TranslateService } from '@ngx-translate/core';

export type ConfirmationSeverity = 'primary' | 'success' | 'warn' | 'danger';

export interface Confirmation {
  severity?: ConfirmationSeverity;
  header: string;
  message: string;
  rejectButtonSeverity?: ConfirmationSeverity;
  acceptButtonText?: string;
  rejectButtonText?: string;
  accept?: () => void;
  reject?: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  private confirmationService = inject(ConfirmationService);
  private focusService = inject(FocusService);
  private translate = inject(TranslateService);

  public confirm(confirmation: Confirmation) {
    this.focusService.push();
    this.confirmationService.confirm({
      message: confirmation.message,
      header: confirmation.header,
      rejectButtonProps: {
        label: confirmation.rejectButtonText ?? this.translate.instant('CANCEL'),
        severity: confirmation.rejectButtonSeverity ?? 'secondary',
      },
      acceptButtonProps: {
        label: confirmation.acceptButtonText ?? this.translate.instant('OK'),
        severity: confirmation.severity ?? 'primary',
      },
      accept: () => {
        this.focusService.pop();
        confirmation.accept?.();
      },
      reject: () => {
        this.focusService.pop();
        confirmation.reject?.();
      },
    });
  }
}
