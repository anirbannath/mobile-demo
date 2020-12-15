import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { HeaderModule } from '../_shared/components/header/header.module';
import { HomeContainerComponent } from './home-container.component';
import { NotesModule } from '../_shared/components/notes/notes.module';


@NgModule({
  declarations: [HomePageComponent, HomeContainerComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    HeaderModule,
    NotesModule
  ]
})
export class HomePageModule { }
