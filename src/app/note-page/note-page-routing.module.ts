import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteContainerComponent } from './note-container.component';


const routes: Routes = [
  { path: ':id/edit', component: NoteContainerComponent },
  { path: ':id', component: NoteContainerComponent },
  { path: '', component: NoteContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotePageRoutingModule { }
