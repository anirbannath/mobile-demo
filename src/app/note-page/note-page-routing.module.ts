import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateContactGuard } from '../_shared/guards/can-activate-contact.guard';
import { NoteContainerComponent } from './note-container.component';
import { NoteEditContainerComponent } from './note-edit-container.component';


const routes: Routes = [
  {
    path: ':id/edit', component: NoteEditContainerComponent,
    data: { animationKey: 'EditNotePage' }
  },
  {
    path: ':id', component: NoteContainerComponent,
    data: { animationKey: 'ViewNotePage' }
  },
  {
    path: '', component: NoteEditContainerComponent,
    data: { animationKey: 'CreateNotePage' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotePageRoutingModule { }
