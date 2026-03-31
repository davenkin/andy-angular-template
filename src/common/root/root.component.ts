import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { GLOBAL_SPINNER } from 'common/service/spinner.service';
import { SpinnerComponent } from 'common/component/spinner/spinner.component';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { RefreshService } from 'common/service/refresh.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterOutlet, SpinnerComponent, Toast, ConfirmDialog, TranslatePipe],
})
export class RootComponent {
  protected readonly GLOBAL_SPINNER = GLOBAL_SPINNER;
  protected refreshService = inject(RefreshService);
}
