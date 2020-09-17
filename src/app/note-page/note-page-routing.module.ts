import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteContainerComponent } from './note-container.component';


const routes: Routes = [
  {
    path: ':id/edit', component: NoteContainerComponent,
    data: { animationKey: 'EditNotePage' }
  },
  {
    path: ':id', component: NoteContainerComponent,
    data: { animationKey: 'ViewNotePage' }
  },
  {
    path: '', component: NoteContainerComponent,
    data: { animationKey: 'CreateNotePage' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotePageRoutingModule { }
