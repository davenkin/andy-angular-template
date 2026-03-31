import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from 'common/config/route.config';
import { providePrimeNG } from 'primeng/config';
import { includeBearerTokenInterceptor, provideKeycloak } from 'common/config/auth.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiResponseErrorInterceptor } from './error.config';
import { preset } from 'common/style/primeng/primeng-preset';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { provideI18n } from 'common/config/i18n.config';

export const applicationConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: preset,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'reset, base, primeng, primeng-override, utility',
          },
        },
      },
    }),
    provideKeycloak(),
    importProvidersFrom(NgxSpinnerModule),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor, apiResponseErrorInterceptor])),
    provideI18n(),
    MessageService,
    ConfirmationService,
    DialogService,
  ],
};
