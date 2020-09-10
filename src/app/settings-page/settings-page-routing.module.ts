import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsContainerComponent } from './settings-container.component';


const routes: Routes = [{ path: '', component: SettingsContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPageRoutingModule { }
