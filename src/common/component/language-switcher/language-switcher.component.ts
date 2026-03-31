import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CurrentContextService } from 'common/service/current-context.service';
import { FloatLabel } from 'primeng/floatlabel';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Select, FormsModule, FloatLabel, TranslatePipe],
})
export class LanguageSwitcherComponent {
  private currentContextService = inject(CurrentContextService);
  protected currentLanguage = signal(this.currentContextService.language());
  protected languages = [
    {
      languageCode: 'zh',
      languageName: '中文',
    },
    {
      languageCode: 'en',
      languageName: 'English',
    },
  ];

  protected changeLanguage() {
    this.currentContextService.changeLanguage(this.currentLanguage());
  }
}
