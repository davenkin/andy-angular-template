import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FocusService {
  private elements: HTMLElement[] = [];
  private document = inject(DOCUMENT);

  public push(selector?: string) {
    if (selector) {
      const element = this.document.querySelector(selector);
      if (element instanceof HTMLElement) {
        this.elements.push(element);
      }
    } else {
      if (this.document.activeElement && this.document.activeElement instanceof HTMLElement) {
        this.elements.push(this.document.activeElement);
      }
    }
  }

  public pop() {
    if (this.elements.length === 0) {
      return;
    }
    const element = this.elements.pop();
    if (typeof element?.focus === 'function') {
      element.focus();
    }
  }

  public focus(selector?: string) {
    if (selector) {
      const element = this.document.querySelector(selector);
      if (element instanceof HTMLElement && typeof element?.focus === 'function') {
        element.focus();
      }
    }
  }
}
