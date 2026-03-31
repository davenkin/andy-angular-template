import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonDirective, ButtonLabel } from 'primeng/button';
import { CurrentContextService } from 'common/service/current-context.service';

@Component({
  selector: 'app-public-main-page-layout',
  templateUrl: './public-main-page-layout.component.html',
  styleUrl: './public-main-page-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ButtonLabel, ButtonDirective, RouterOutlet],
})
export class PublicMainPageLayoutComponent {
  protected router = inject(Router);
  protected currentContextService = inject(CurrentContextService);
}
