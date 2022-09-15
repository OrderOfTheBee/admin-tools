import { Routes } from '@angular/router';
import { AuthGuardEcm, BlankPageComponent } from '@alfresco/adf-core';
import { AppLayoutComponent } from './components/layout/app-layout/app-layout.component';
import { ExtensionsDataLoaderGuard, GenericErrorComponent } from '@alfresco/aca-shared';

export const APP_ROUTES: Routes = [
    {
        path: 'blank',
        component: BlankPageComponent,
    },
    {
        path: 'login',
        loadChildren: () => import('../../../../../libs/modules/login/src/lib/login.module').then((m) => m.ContezzaLoginModule),
    },
    {
        path: '',
        component: AppLayoutComponent,
        canActivate: [AuthGuardEcm, ExtensionsDataLoaderGuard],
        children: [
            {
                path: '',
                redirectTo: `/admin-tools`,
                pathMatch: 'full',
            },
            {
                path: 'javascript-console',
                loadChildren: () => import('../../../../../libs/mgmt/js-console/src/lib/js-console.module').then((m) => m.ContezzaJsConsoleModule),
            },
            {
                path: 'node-browser',
                loadChildren: () => import('../../../../../libs/mgmt/node-browser/src/lib/node-browser.module').then((m) => m.ContezzaNodeBrowserModule),
            },
        ],
    },
    {
        path: 'preview/:nodeId',
        loadChildren: () => import('./components/preview/preview.module').then((m) => m.PreviewModule),
        data: {
            navigateSource: 'personal-files',
        },
    },
    {
        path: '**',
        component: GenericErrorComponent,
    },
];
