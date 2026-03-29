import { computed, inject, Injectable, signal } from '@angular/core';
import Keycloak from 'keycloak-js';
import { RefreshService } from 'common/service/refresh.service';
import { environment } from 'environments/environment';
import { SUPER_ADMIN_REALM } from 'common/config/constant';
import { isEqual } from 'lodash-es';

const LANGUAGE_TO_LOCALE: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en-US',
};

export interface CurrentOrg {
  id: string;
  name: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class CurrentContextService {
  private keycloak = inject(Keycloak);
  private refreshService = inject(RefreshService);
  private readonly LANGUAGE_KEY = '__language';
  public readonly ORG_KEY = '__org';
  private _language = signal(localStorage.getItem(this.LANGUAGE_KEY) || 'zh');
  private _org = signal<CurrentOrg | undefined>(undefined);

  public language = this._language.asReadonly();
  public locale = computed(() => LANGUAGE_TO_LOCALE[this.language()]);
  public org = this._org.asReadonly();
  public orgId = computed(() => this._org()?.id);

  public changeLanguage(language: string) {
    const supportedLanguages = Object.keys(LANGUAGE_TO_LOCALE);
    if (supportedLanguages.includes(language)) {
      this._language.set(language);
      localStorage.setItem(this.LANGUAGE_KEY, this.language());
      this.refreshService.refreshWholeApp();
    } else {
      console.error(
        `Failed to change language to [${language}] as it's not supported, the supported languages are [${supportedLanguages}].`,
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
}
