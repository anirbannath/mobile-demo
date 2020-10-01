import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '../_shared/components/header/header.module';
import { SettingsPageRoutingModule } from './settings-page-routing.module';
import { SettingsPageComponent } from './settings-page.component';
import { SettingsContainerComponent } from './settings-container.component';


@NgModule({
  declarations: [SettingsPageComponent, SettingsContainerComponent],
  imports: [
    CommonModule,
    SettingsPageRoutingModule,
    HeaderModule
  ]
})
export class SettingsPageModule { }
