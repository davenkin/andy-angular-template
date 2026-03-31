import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { TranslateService } from '@ngx-translate/core';

export interface PageChangedEvent {
  pageNumber: number;
  pageSize: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Paginator],
})
export class PaginatorComponent {
  private translate = inject(TranslateService);
  appendTo = input('body');
  pageNumber = input(0);
  pageSize = input(25);
  totalElements = input.required<number>();
  showSelectionSummary = input(false);
  showTotalSummary = input(true);
  selectedCount = input(0);
  pageChanged = output<PageChangedEvent>();

  protected summary = computed(() => {
    if (this.showSelectionSummary()) {
      return this.translate.instant('PAGINATION.SELECTION_SUMMARY', {
        total: this.totalElements(),
        selectedCount: `<span class="selected-count">${this.selectedCount()}</span>`,
      });
    }
    if (this.showTotalSummary()) {
      return this.translate.instant('PAGINATION.TOTAL_SUMMARY', { total: this.totalElements() });
    }
  });

  protected changePage(state: PaginatorState) {
    this.pageChanged.emit({ pageNumber: state.page as number, pageSize: state.rows as number });
  }
}
