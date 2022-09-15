import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule, TranslationService } from '@alfresco/adf-core';

import { ExtensionService, ExtensionsModule, provideExtensionConfig } from '@alfresco/adf-extensions';
import { PageLayoutModule } from '@alfresco/aca-shared';

import { ManagePermissionsModule } from '@contezza/mgmt/permissions';
import { ContezzaProfileModule } from '@contezza/profile';
import { ManageZaakTypesModule } from '@contezza/mgmt/zaak-types';
import { ManageFolderTemplatesModule } from '@contezza/mgmt/folder-templates';
import { ManageRemoteConnenctionsModule } from '@contezza/mgmt/remote-connections';
import { ContezzaJsConsoleExtensionModule } from '@contezza/mgmt/js-console-extensions';

import * as rules from './rules/admin-tools.rules';

import { MaterialModule } from './material.module';
import { AdminToolsHomeComponent } from './components/admin-tools-home/admin-tools-home.component';
import { ContezzaNodeBrowserExtensionModule } from '@contezza/mgmt/node-browser';

@NgModule({
    declarations: [AdminToolsHomeComponent],
    imports: [
        CommonModule,
        CoreModule,
        ExtensionsModule,
        MaterialModule,
        TranslateModule,
        PageLayoutModule,
        ContezzaProfileModule,
        ManagePermissionsModule,
        ManageZaakTypesModule,
        ManageFolderTemplatesModule,
        ManageRemoteConnenctionsModule,
        ContezzaJsConsoleExtensionModule,
        ContezzaNodeBrowserExtensionModule,
    ],
    exports: [],
    providers: [
        provideExtensionConfig([
            'contezza-admin-tools-navbar.json',
            'contezza-admin-tools-routes.json',
            'contezza-admin-tools-header.json',
            'contezza-admin-tools-manuals.json',
            'contezza-admin-tools-icons.json',
        ]),
    ],
})
export class ContezzaAdminToolsModule {
    constructor(translation: TranslationService, extensions: ExtensionService) {
        extensions.setComponents({
            'app.admin-tools-home.component': AdminToolsHomeComponent,
        });

        extensions.setEvaluators({
            'app.user.isAdmin': rules.isAdmin,
        });

        translation.addTranslationFolder('contezza-admin-tools', 'assets/contezza-admin-tools');
    }
}
