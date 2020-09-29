import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartContainerComponent } from './start-container.component';


const routes: Routes = [{ path: '', component: StartContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartPageRoutingModule { }
