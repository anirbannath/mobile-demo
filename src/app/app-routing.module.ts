import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'contacts', loadChildren: () => import('./contacts-page/contacts-page.module').then(m => m.ContactsPageModule) },
  { path: 'client', loadChildren: () => import('./client-page/client-page.module').then(m => m.ClientPageModule) },

  { path: '**', loadChildren: () => import('./not-found-page/not-found-page.module').then(m => m.NotFoundPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
