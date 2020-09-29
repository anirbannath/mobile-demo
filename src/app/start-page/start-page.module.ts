import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartPageRoutingModule } from './start-page-routing.module';
import { StartPageComponent } from './start-page.component';
import { StartContainerComponent } from './start-container.component';


@NgModule({
  declarations: [StartPageComponent, StartContainerComponent],
  imports: [
    CommonModule,
    StartPageRoutingModule
  ]
})
export class StartPageModule { }
