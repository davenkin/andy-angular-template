import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonDirective, ButtonLabel } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-device-list-page',
  templateUrl: './device-list.page.html',
  styleUrl: './device-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonDirective, ButtonLabel, RouterLink],
})
export class DeviceListPage {}
