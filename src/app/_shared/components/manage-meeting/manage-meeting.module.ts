import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ManageMeetingComponent } from './manage-meeting.component';
import { DialogModule } from '../dialog/dialog.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ManageMeetingComponent],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule
  ],
  providers: [
    DatePipe
  ],
  exports: [ManageMeetingComponent],
})
export class ManageMeetingModule { }
