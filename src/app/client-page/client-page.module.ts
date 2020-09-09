import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPageRoutingModule } from './client-page-routing.module';
import { ClientPageComponent } from './client-page.component';
import { HeaderModule } from '../header/header.module';
import { ClientContainerComponent } from './client-container.component';


@NgModule({
  declarations: [ClientPageComponent, ClientContainerComponent],
  imports: [
    CommonModule,
    ClientPageRoutingModule,
    HeaderModule
  ]
})
export class ClientPageModule { }
