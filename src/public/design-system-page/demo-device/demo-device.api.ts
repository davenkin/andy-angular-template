import { Injectable } from '@angular/core';
import { CpuArchitecture, OsType } from 'common/model/common.model';
import { PagedResponse, PageQuery } from 'common/utils/pagination.utils';
import { randomOf, simpleSortByField } from 'common/utils/common.utils';
import { Observable, of, switchMap, take, timer } from 'rxjs';

export interface QListedDemoDevice {
  id: string;
  name: string;
  osType: OsType;
  cpuArchitecture: CpuArchitecture;
}

export interface ListDemoDevicesQuery extends PageQuery {
  osType?: OsType;
  cpuArchitecture?: CpuArchitecture;
}

@Injectable({
  providedIn: 'root',
})
export class DemoDeviceApi {
  private demoDevices: QListedDemoDevice[] = this.buildDemoDevices();

  public fetchListedDemoDevices(query: ListDemoDevicesQuery): Observable<PagedResponse<QListedDemoDevice>> {
    const filtered = this.demoDevices
      .filter((it) => {
        return query.cpuArchitecture ? it.cpuArchitecture === query.cpuArchitecture : true;
      })
      .filter((it) => {
        return query.osType ? it.osType === query.osType : true;
      });
    const sorted = simpleSortByField(filtered, query.sortField as any, query.sortOrder);

    return timer(1000).pipe(
      take(1),
      switchMap(() => {
        return of({
          content: sorted.slice(query.pageNumber * query.pageSize, (query.pageNumber + 1) * query.pageSize),
          totalElements: sorted.length,
          totalPages: Math.ceil(sorted.length / query.pageSize),
          pageNumber: query.pageNumber,
          pageSize: query.pageSize,
        });
      }),
    );
  }

  private buildDemoDevices() {
    const allOsTypes = Object.values(OsType);
    const allCpuArchitectures = Object.values(CpuArchitecture);
    const devices: QListedDemoDevice[] = [...Array(500)].map((item, index) => {
      return {
        id: 'device_' + index,
        name: 'Device ' + index,
        osType: randomOf(allOsTypes),
        cpuArchitecture: randomOf(allCpuArchitectures),
      };
    });
    return devices;
  }
}
