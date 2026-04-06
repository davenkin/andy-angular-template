import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonDirective, ButtonLabel } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-remote-desktop',
  templateUrl: './remote-desktop.page.html',
  styleUrl: './remote-desktop.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonDirective, ButtonLabel, RouterLink],
})
export class RemoteDesktopPage {}
