import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsPageRoutingModule } from './contacts-page-routing.module';
import { ContactsPageComponent } from './contacts-page.component';
import { HeaderModule } from '../_shared/components/header/header.module';
import { ContactsContainerComponent } from './contacts-container.component';


@NgModule({
  declarations: [ContactsPageComponent, ContactsContainerComponent],
  imports: [
    CommonModule,
    ContactsPageRoutingModule,
    HeaderModule
  ]
})
export class ContactsPageModule { }
