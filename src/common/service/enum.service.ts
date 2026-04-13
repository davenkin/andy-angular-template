import { effect, inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CurrentContextService } from 'common/service/current-context.service';
import { CpuArchitecture, Option, OsType } from 'common/model/common.model';
import { ALL } from 'common/config/constant';

export const OS_TYPE_NAMES = new Map<OsType, string>();
export const CPU_ARCHITECTURE_NAMES = new Map<CpuArchitecture, string>();

@Injectable({
  providedIn: 'root',
})
export class EnumService {
  private translate = inject(TranslateService);
  private currentContextService = inject(CurrentContextService);

  constructor() {
    effect(() => {
      void this.currentContextService.locale();
      this.buildNames();
    });
  }

  private buildNames() {
    this.buildOsTypeNames();
    this.buildCpuArchitectureNames();
  }

  private buildOsTypeNames() {
    Object.values(OsType).forEach((it) => {
      OS_TYPE_NAMES.set(it, this.translate.instant('ENUM.OS_TYPE.' + it));
    });
  }

  private buildCpuArchitectureNames() {
    Object.values(CpuArchitecture).forEach((it) => {
      CPU_ARCHITECTURE_NAMES.set(it, this.translate.instant('ENUM.CPU_ARCHITECTURE.' + it));
    });
  }

  public optionsOf(names: Map<string, string>): Option[] {
    return [...names].map(([key, value]) => ({
      value: key,
      label: value,
    }));
  }

  public allableOptionsOf(names: Map<string, string>): Option[] {
    const options = this.optionsOf(names);
    options.unshift({ value: ALL, label: this.translate.instant('ALL') });
    return options;
  }
}
