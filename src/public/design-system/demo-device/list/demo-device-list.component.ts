import { Component, inject, OnInit, signal } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import {
  DemoDeviceApi,
  ListDemoDevicesQuery,
  QListedDemoDevice,
} from 'public/design-system/demo-device/demo-device.api';
import { finalize, take } from 'rxjs';
import { SpinnerService } from 'common/service/spinner.service';
import { PageChangedEvent, PaginatorComponent } from 'common/component/paginator/paginator.component';
import { Select } from 'primeng/select';
import { CPU_ARCHITECTURE_NAMES, EnumService, OS_TYPE_NAMES } from 'common/service/enum.service';
import { FormsModule } from '@angular/forms';
import { ALL } from 'common/config/constant';
import { SpinnerComponent } from 'common/component/spinner/spinner.component';
import { FloatLabel } from 'primeng/floatlabel';
import { TranslatePipe } from '@ngx-translate/core';
import { sortFieldFrom, SortOrder, sortOrderFrom } from 'common/utils/pagination.utils';
import { TableEmptyPlaceholderComponent } from 'common/component/table-empty-placeholder/table-empty-placeholder.component';
import { CpuArchitecture, OsType } from 'common/model/common.model';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-demo-device-list',
  templateUrl: './demo-device-list.component.html',
  styleUrl: './demo-device-list.component.scss',
  imports: [
    TableModule,
    PaginatorComponent,
    Select,
    FormsModule,
    SpinnerComponent,
    FloatLabel,
    TranslatePipe,
    TableEmptyPlaceholderComponent,
    Button,
  ],
})
export class DemoDeviceListComponent implements OnInit {
  protected readonly OS_TYPE_NAMES = OS_TYPE_NAMES;
  protected readonly CPU_ARCHITECTURE_NAMES = CPU_ARCHITECTURE_NAMES;
  protected demoDeviceSpinner = 'demoDeviceSpinner';
  private demoDeviceApi = inject(DemoDeviceApi);
  protected enumService = inject(EnumService);
  private spinner = inject(SpinnerService);
  protected selectedOsType = ALL;
  protected selectedCpuArchitectureType = ALL;
  protected devices = signal<QListedDemoDevice[]>([]);
  protected totalElements = 0;
  protected selectedDevices: QListedDemoDevice[] = [];
  protected query: ListDemoDevicesQuery = {
    pageNumber: 0,
    pageSize: 25,
    sortField: 'name',
    sortOrder: SortOrder.DESC,
  };

  ngOnInit(): void {
    this.fetchDemoDevices();
  }

  protected filterByOsType(type: OsType | typeof ALL) {
    this.query.osType = type === ALL ? undefined : type;
    this.query.pageNumber = 0;
    this.fetchDemoDevices();
  }

  protected filterByCpuArchitecture(architecture: CpuArchitecture | typeof ALL) {
    this.query.cpuArchitecture = architecture === ALL ? undefined : architecture;
    this.query.pageNumber = 0;
    this.fetchDemoDevices();
  }

  protected sort(event: TableLazyLoadEvent) {
    this.query.sortField = sortFieldFrom(event);
    this.query.sortOrder = sortOrderFrom(event);
    this.query.pageNumber = 0;
    this.fetchDemoDevices();
  }

  protected changePage(event: PageChangedEvent) {
    this.query.pageNumber = event.pageNumber;
    this.query.pageSize = event.pageSize;
    this.fetchDemoDevices();
  }

  private fetchDemoDevices() {
    this.spinner.show(this.demoDeviceSpinner);
    this.demoDeviceApi
      .fetchListedDemoDevices(this.query)
      .pipe(
        take(1),
        finalize(() => {
          this.spinner.hide(this.demoDeviceSpinner);
        }),
      )
      .subscribe((response) => {
        this.devices.set(response.content);
        this.totalElements = response.totalElements;
        this.selectedDevices = [];
      });
  }
}
