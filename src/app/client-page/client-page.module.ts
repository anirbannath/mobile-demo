import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPageRoutingModule } from './client-page-routing.module';
import { ClientPageComponent } from './client-page.component';
import { HeaderModule } from '../_shared/components/header/header.module';
import { ClientContainerComponent } from './client-container.component';
import { NotesModule } from '../_shared/components/notes/notes.module';


@NgModule({
  declarations: [ClientPageComponent, ClientContainerComponent],
  imports: [
    CommonModule,
    ClientPageRoutingModule,
    HeaderModule,
    NotesModule
  ]
})
export class ClientPageModule { }
