import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { HeaderModule } from '../header/header.module';
import { HomeContainerComponent } from './home-container.component';


@NgModule({
  declarations: [HomePageComponent, HomeContainerComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    HeaderModule
  ]
})
export class HomePageModule { }
