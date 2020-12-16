import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../_shared/components/header/header.module';

import { NotePageRoutingModule } from './note-page-routing.module';
import { NoteContainerComponent } from './note-container.component';
import { NotePageComponent } from './note-page.component';
import { NoteEditPageComponent } from './note-edit-page.component';
import { NoteEditContainerComponent } from './note-edit-container.component';
import { DialogModule } from '../_shared/components/dialog/dialog.module';
import { ManageTagsModule } from '../_shared/components/manage-tags/manage-tags.module';
import { ManageMeetingModule } from '../_shared/components/manage-meeting/manage-meeting.module';


@NgModule({
  declarations: [
    NoteContainerComponent,
    NotePageComponent,
    NoteEditContainerComponent,
    NoteEditPageComponent
  ],
  imports: [
    CommonModule,
    NotePageRoutingModule,
    FormsModule,
    HeaderModule,
    ManageTagsModule,
    ManageMeetingModule
  ]
})
export class NotePageModule { }
