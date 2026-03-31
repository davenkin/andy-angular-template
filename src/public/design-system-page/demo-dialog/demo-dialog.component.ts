import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
import { DialogCloseResult } from 'common/service/dialog.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-demo-dialog',
  templateUrl: './demo-dialog.component.html',
  styleUrl: './demo-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, TranslatePipe],
})
export class DemoDialogComponent {
  private dialogRef = inject(DynamicDialogRef);
  someInputValue = input<string | null>(null);

  protected cancel() {
    this.dialogRef.close();
  }

  protected save() {
    this.dialogRef.close(DialogCloseResult.SUCCEED);
  }
}
