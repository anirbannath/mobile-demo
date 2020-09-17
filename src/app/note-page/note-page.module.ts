import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotePageRoutingModule } from './note-page-routing.module';
import { NotePageComponent } from './note-page.component';
import { NoteContainerComponent } from './note-container.component';
import { HeaderModule } from '../header/header.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NotePageComponent, NoteContainerComponent],
  imports: [
    CommonModule,
    NotePageRoutingModule,
    FormsModule,
    HeaderModule
  ]
})
export class NotePageModule { }
