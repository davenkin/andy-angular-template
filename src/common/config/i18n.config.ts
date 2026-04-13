import {
  DOCUMENT,
  effect,
  EnvironmentProviders,
  inject,
  LOCALE_ID,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import zhCnTranslation from 'common/config/i18n/zh-CN.json';
import enTranslation from 'common/config/i18n/en.json';
import { CurrentContextService } from 'common/service/current-context.service';
import localeZh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { PrimeNG } from 'primeng/config';
import { all as PrimeLocals, AllLocales } from 'primelocale';
import { Title } from '@angular/platform-browser';

registerLocaleData(localeZh, 'zh-CN');

export function provideI18n(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: LOCALE_ID, useValue: 'zh-CN' }, //This is just the default locale, use CurrentContextService.locale() to get the real locale dynamically
    provideTranslateService({ lang: 'zh-CN' }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      const primeNG = inject(PrimeNG);
      const currentContext = inject(CurrentContextService);
      const document = inject(DOCUMENT);
      const title = inject(Title);

      translate.setTranslation('zh-CN', zhCnTranslation);
      translate.setTranslation('en', enTranslation);
      effect(() => {
        document.documentElement.lang = currentContext.locale();
        translate.use(currentContext.locale());
        title.setTitle(translate.instant('APP_NAME'));
        primeNG.setTranslation(PrimeLocals[currentContext.locale() as keyof AllLocales]);
      });
    }),
  ]);
}
