import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-member-list-page',
  templateUrl: './member-list.page.html',
  styleUrl: './member-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberListPage {}
