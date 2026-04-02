import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';

export const GLOBAL_SPINNER = 'GLOBAL_SPINNER';
export const CONSOLE_MAIN_SPINNER = 'CONSOLE_MAIN_SPINNER';

export interface SpinnerConfig {
  transparentBackground?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinner = inject(NgxSpinnerService);

  public showGlobalSpinner(config?: SpinnerConfig) {
    this.spinner.show(GLOBAL_SPINNER, {
      bdColor: config?.transparentBackground ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.3)',
    });
  }

  public hideGlobalSpinner() {
    this.spinner.hide(GLOBAL_SPINNER);
  }

  public showConsoleMainSpinner(config?: SpinnerConfig) {
    this.spinner.show(CONSOLE_MAIN_SPINNER, {
      bdColor: config?.transparentBackground ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.3)',
    });
  }

  public hideConsoleMainSpinner() {
    this.spinner.hide(CONSOLE_MAIN_SPINNER);
  }

  public show(spinnerName: string, spinner?: Spinner) {
    this.spinner.show(spinnerName, spinner);
  }

  public hide(spinnerName: string) {
    this.spinner.hide(spinnerName);
  }

  public withGlobalSpinner<T>(obs$: Observable<T>, config?: SpinnerConfig): Observable<T> {
    this.showGlobalSpinner(config);
    return obs$.pipe(finalize(() => this.hideGlobalSpinner()));
  }

  public withConsoleMainSpinner<T>(obs$: Observable<T>, config?: SpinnerConfig): Observable<T> {
    this.showConsoleMainSpinner(config);
    return obs$.pipe(finalize(() => this.hideConsoleMainSpinner()));
  }

  public withSpinner<T>(spinnerName: string, obs$: Observable<T>, spinner?: Spinner): Observable<T> {
    this.show(spinnerName, spinner);
    return obs$.pipe(finalize(() => this.hide(spinnerName)));
  }
}
