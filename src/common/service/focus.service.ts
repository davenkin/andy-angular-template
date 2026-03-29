import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FocusService {
  private elements: HTMLElement[] = [];

  public push(selector?: string) {
    if (selector) {
      const element = document.querySelector(selector);
      if (element instanceof HTMLElement) {
        this.elements.push(element);
      }
    } else {
      if (document.activeElement && document.activeElement instanceof HTMLElement) {
        this.elements.push(document.activeElement);
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
      const element = document.querySelector(selector);
      if (element instanceof HTMLElement && typeof element?.focus === 'function') {
        element.focus();
      }
    }
  }
}
