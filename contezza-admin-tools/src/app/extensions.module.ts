import { NgModule } from '@angular/core';

import { AosExtensionModule } from '@alfresco/content-ce/office-services';
import { AcaAboutModule } from '@alfresco/content-ce/about';
import { AcaSettingsModule } from '@alfresco/content-ce/settings';
import { ContezzaAdminToolsModule } from '@contezza/contezza-admin-tools';
import { environment } from '../environments/environment';

@NgModule({
    imports: [AosExtensionModule, ...(environment.devTools ? [AcaSettingsModule] : []), AcaAboutModule.forRoot(environment.production), ContezzaAdminToolsModule],
})
export class AppExtensionsModule {}
