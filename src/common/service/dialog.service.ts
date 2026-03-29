import { inject, Injectable } from '@angular/core';
import { FocusService } from 'common/service/focus.service';
import { DialogService as PrimeDialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export type DialogSize = 'small' | 'medium' | 'large' | 'x-large';

export interface DialogSetting {
  header: string;
  size?: DialogSize;
  data?: any;
}

export enum DialogCloseResult {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  CANCELLED = 'CANCELLED',
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
    const width: string = this.widthOfSize(setting.size);
    const dialogRef = this.primeDialogService.open(component, {
      header: setting.header,
      modal: true,
      closable: true,
      closeOnEscape: true,
      closeAriaLabel: this.translate.instant('CLOSE_DIALOG'),
      width: width,
      data: setting.data,
    }) as DynamicDialogRef;
    dialogRef.onClose.pipe(take(1)).subscribe(() => this.focusService.pop());
    return dialogRef;
  }

  private widthOfSize(size?: DialogSize) {
    const finalSize = size ?? 'medium';
    switch (finalSize) {
      case 'small': {
        return 'var(--436px)';
      }
      case 'medium': {
        return 'var(--572px)';
      }
      case 'large': {
        return 'var(--864px)';
      }
      case 'x-large': {
        return 'var(--1110px)';
      }
    }
  }
}
