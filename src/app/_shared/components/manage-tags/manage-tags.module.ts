import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTagsComponent } from './manage-tags.component';
import { DialogModule } from '../dialog/dialog.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ManageTagsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule
  ],
  exports: [ManageTagsComponent],
})
export class ManageTagsModule { }
