import { inject, Injectable } from '@angular/core';
import { FocusService } from 'common/service/focus.service';
import { DialogService as PrimeDialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export type DialogSize = 'small' | 'medium' | 'large' | 'x-large';

export interface DialogSetting {
  header?: string;
  size?: DialogSize;
  data?: any;
  inputValues?: Record<string, any>;
  showHeader?: boolean;
}

export enum DialogCloseResult {
  SUCCEED = 'SUCCEED',
  FAILED = 'FAILED',
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private focusService = inject(FocusService);
  private primeDialogService = inject(PrimeDialogService);
  private translate = inject(TranslateService);

  public open(component: any, setting: DialogSetting): DynamicDialogRef {
    this.focusService.push();
    const dialogRef = this.primeDialogService.open(component, {
      header: setting.header,
      modal: true,
      closable: true,
      closeOnEscape: true,
      closeAriaLabel: this.translate.instant('CLOSE_DIALOG'),
      width: this.widthOfSize(setting.size),
      data: setting.data,
      inputValues: setting.inputValues,
      showHeader: setting.showHeader === undefined ? true : setting.showHeader,
    }) as DynamicDialogRef;
    dialogRef.onDestroy.pipe(take(1)).subscribe(() => this.focusService.pop());
    return dialogRef;
  }

  private widthOfSize(size?: DialogSize) {
    const finalSize = size ?? 'medium';
    switch (finalSize) {
      case 'small': {
        return 'var(--dialog-small-width)';
      }
      case 'medium': {
        return 'var(--dialog-medium-width)';
      }
      case 'large': {
        return 'var(--dialog-large-width)';
      }
      case 'x-large': {
        return 'var(--dialog-xlarge-width)';
      }
    }
  }
}
