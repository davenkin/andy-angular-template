import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CurrentContextService } from 'common/service/current-context.service';
import { FloatLabel } from 'primeng/floatlabel';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-locale-switcher',
  templateUrl: './locale-switcher.component.html',
  styleUrl: './locale-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Select, FormsModule, FloatLabel, TranslatePipe],
})
export class LocaleSwitcherComponent {
  private currentContextService = inject(CurrentContextService);
  protected currentLocale = signal(this.currentContextService.locale());
  protected allLocales = [
    {
      localeCode: 'zh-CN',
      localeName: '中文',
    },
    {
      localeCode: 'en',
      localeName: 'English',
    },
  ];

  protected changeLocale() {
    this.currentContextService.changeLocale(this.currentLocale());
  }
}
