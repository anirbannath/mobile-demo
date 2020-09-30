import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const navigationInstructions = [
  {
    name: 'My Home',
    target: 'note',
    path: '/home',
    navigationKey: ['homepage', 'home']
  },
  {
    name: 'Contacts',
    target: 'contact',
    path: '/contacts',
    navigationKey: ['contact', 'contacts']
  },
  {
    name: 'Client Info',
    target: 'note',
    path: '/client',
    navigationKey: ['client', 'clients']
  },
  {
    name: 'Settings',
    path: '/settings',
    navigationKey: ['setting', 'settings']
  },
  {
    name: 'Create Note',
    path: '/note',
    navigationKey: ['note', 'create note']
  }
]

export const appRoutes: Routes = [
  {
    path: 'start',
    loadChildren: () => import('./start-page/start-page.module').then(m => m.StartPageModule),
    data: { animationKey: 'StartPage' }
  },
  {
    path: 'home',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
    data: { animationKey: 'HomePage' }
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts-page/contacts-page.module').then(m => m.ContactsPageModule),
    data: { animationKey: 'ContactsPage' }
  },
  {
    path: 'client',
    loadChildren: () => import('./client-page/client-page.module').then(m => m.ClientPageModule),
    data: { animationKey: 'ClientPage' }
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings-page/settings-page.module').then(m => m.SettingsPageModule),
    data: { animationKey: 'SettingsPage' }
  },
  {
    path: 'note',
    loadChildren: () => import('./note-page/note-page.module').then(m => m.NotePageModule),
  },

  { path: '', pathMatch: 'full', redirectTo: 'start' },
  { path: '**', loadChildren: () => import('./not-found-page/not-found-page.module').then(m => m.NotFoundPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
