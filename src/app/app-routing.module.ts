import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const voiceNavigations = [
  {
    path: 'home',
    navigationKey: ['homepage', 'home']
  },
  {
    path: 'contacts',
    navigationKey: ['contact', 'contacts']
  },
  {
    path: 'client',
    navigationKey: ['client', 'clients']
  },
  {
    path: 'settings',
    navigationKey: ['setting', 'settings']
  },
  {
    path: 'note',
    navigationKey: ['create note', 'create a note', 'create notes']
  },
  {
    path: 'goBack',
    navigationKey: ['cancel', 'discard']
  }
]

export const appRoutes: Routes = [
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
