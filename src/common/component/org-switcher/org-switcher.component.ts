import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Select, SelectChangeEvent } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CurrentContextService } from 'common/service/current-context.service';
import { random } from 'lodash-es';
import { FloatLabel } from 'primeng/floatlabel';
import { TranslatePipe } from '@ngx-translate/core';
import { CurrentOrg } from 'common/model/common.model';

@Component({
  selector: 'app-org-switcher',
  templateUrl: './org-switcher.component.html',
  styleUrl: './org-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Select, FormsModule, FloatLabel, TranslatePipe],
})
export class OrgSwitcherComponent implements OnInit {
  protected currentContextService = inject(CurrentContextService);
  protected orgs = signal<CurrentOrg[]>([]);

  ngOnInit(): void {
    // todo: user whatever means to load orgs to be selected
    let orgs = [
      {
        id: random(1, 10000).toFixed(0),
        name: 'Company ' + random(1, 10000).toFixed(0),
      },
    ];
    const currentOrg = this.currentContextService.org();
    if (currentOrg) {
      orgs = [currentOrg, ...orgs];
    }
    this.orgs.set(orgs);
  }

  protected changeOrg(event: SelectChangeEvent) {
    this.currentContextService.changeOrg(event.value as CurrentOrg);
  }
}
