import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
    data: { navigationKey: 'home', animationKey: 'HomePage' }
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts-page/contacts-page.module').then(m => m.ContactsPageModule),
    data: { navigationKey: 'contact', animationKey: 'ContactsPage' }
  },
  {
    path: 'client',
    loadChildren: () => import('./client-page/client-page.module').then(m => m.ClientPageModule),
    data: { navigationKey: 'client', animationKey: 'ClientPage' }
  },

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', loadChildren: () => import('./not-found-page/not-found-page.module').then(m => m.NotFoundPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
