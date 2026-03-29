import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
import { DialogCloseResult } from 'common/service/dialog.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-demo-dialog',
  templateUrl: './demo-dialog.component.html',
  styleUrl: './demo-dialog.component.scss',
  imports: [Button, TranslatePipe],
})
export class DemoDialogComponent {
  protected dialogConfig = inject(DynamicDialogConfig);
  private dialogRef = inject(DynamicDialogRef);

  protected cancel() {
    this.dialogRef.close();
  }

  protected save() {
    this.dialogRef.close(DialogCloseResult.SUCCEED);
  }
}
