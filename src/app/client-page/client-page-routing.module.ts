import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientContainerComponent } from './client-container.component';


const routes: Routes = [
  { path: '', component: ClientContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPageRoutingModule { }
