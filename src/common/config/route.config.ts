import { ActivatedRouteSnapshot, CanActivateChildFn, RouterStateSnapshot, Routes } from '@angular/router';
import { DesignSystemPage } from 'public/design-system-page/design-system.page';
import { DeviceListPage } from 'console/device/list-page/device-list.page';
import { RemoteDesktopPage } from 'console/device/remote-operation/remote-desktop/remote-desktop.page';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { HomePage } from 'public/home-page/home.page';
import { PricingPage } from 'public/pricing-page/pricing.page';
import { DashboardPage } from 'console/dashboard/dashboard-page/dashboard.page';
import { MemberListPage } from 'console/member/list-page/member-list.page';
import { PublicMainPageLayoutComponent } from 'common/layout/public-main-page-layout/public-main-page-layout.component';
import { ConsoleBasePageComponent } from 'common/layout/console-base-page/console-base-page.component';
import { ConsoleMainPageLayoutComponent } from 'common/layout/console-main-page-layout/console-main-page-layout.component';

const ensureAuthenticatedGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const keycloak = inject(Keycloak);
  if (keycloak.authenticated) {
    return true;
  }

  keycloak.login({ redirectUri: window.location.origin + state.url });
  return false;
};

export const routes: Routes = [
  {
    path: 'console',
    component: ConsoleBasePageComponent,
    canActivate: [ensureAuthenticatedGuard],
    children: [
      {
        path: '',
        component: ConsoleMainPageLayoutComponent,
        children: [
          {
            path: '',
            component: DashboardPage,
          },
          {
            path: 'devices',
            component: DeviceListPage,
          },
          {
            path: 'members',
            component: MemberListPage,
          },
        ],
      },
      {
        path: 'remote-desktop',
        component: RemoteDesktopPage,
      },
    ],
  },
  {
    path: '',
    component: PublicMainPageLayoutComponent,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'pricing',
        component: PricingPage,
      },
    ],
  },
  {
    path: 'design-system',
    component: DesignSystemPage,
  },
];
