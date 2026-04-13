import { computed, inject, Injectable, signal } from '@angular/core';
import Keycloak from 'keycloak-js';
import { RefreshService } from 'common/service/refresh.service';
import { environment } from 'environments/environment';
import { SUPER_ADMIN_REALM } from 'common/config/constant';
import { isEqual } from 'lodash-es';
import { CurrentOrg, CurrentUser } from 'common/model/common.model';

@Injectable({ providedIn: 'root' })
export class CurrentContextService {
  private keycloak = inject(Keycloak);
  private refreshService = inject(RefreshService);
  private readonly LOCALE_KEY = '__locale';
  public readonly ORG_KEY = '__org';
  private readonly SUPPORTED_LOCALES = ['zh-CN', 'en'];
  private _locale = signal(localStorage.getItem(this.LOCALE_KEY) || this.getBrowserLocale());
  private _org = signal<CurrentOrg | undefined>(undefined);
  public org = this._org.asReadonly();
  public locale = this._locale.asReadonly();
  public orgId = computed(() => this._org()?.id);

  public changeLocale(locale: string) {
    if (this.SUPPORTED_LOCALES.includes(locale)) {
      this._locale.set(locale);
      localStorage.setItem(this.LOCALE_KEY, this.locale());
      this.refreshService.refreshWholeApp();
    } else {
      console.error(
        `Failed to change locale to [${locale}] as it's not supported, the supported locales are [${this.SUPPORTED_LOCALES}].`,
      );
    }
  }

  public changeOrg(org: CurrentOrg, reload = true) {
    if (isEqual(this.org(), org)) {
      return;
    }
    this._org.set(org);
    localStorage.setItem(this.ORG_KEY, JSON.stringify(org));
    if (reload) {
      this.refreshService.refreshWholeApp();
    }
  }

  public user(): CurrentUser | null {
    return this.keycloak.tokenParsed
      ? {
          id: this.keycloak.tokenParsed.sub as string,
          name:
            (this.keycloak.tokenParsed['name'] as string) ||
            (this.keycloak.tokenParsed['preferred_username'] as string),
          email: this.keycloak.tokenParsed['email'] as string,
        }
      : null;
  }

  public isDevelopment() {
    return environment.development;
  }

  public isSuperAdminUser() {
    return this.keycloak.realm === SUPER_ADMIN_REALM;
  }

  private getBrowserLocale() {
    if (navigator.language.includes('en')) {
      return 'en';
    }
    return 'zh-CN'; // default to Chinese
  }
}
