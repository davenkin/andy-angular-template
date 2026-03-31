import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { iconRegistry } from 'common/component/icon/icon-registry';
import { DomSanitizer } from '@angular/platform-browser';

export type IconType = keyof typeof iconRegistry;

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  icon = input.required<IconType>();
  private domSanitizer = inject(DomSanitizer);

  get iconSvg() {
    return this.domSanitizer.bypassSecurityTrustHtml(iconRegistry[this.icon()]);
  }
}
