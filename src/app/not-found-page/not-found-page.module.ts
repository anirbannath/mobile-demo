import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundPageRoutingModule } from './not-found-page-routing.module';
import { NotFoundPageComponent } from './not-found-page.component';
import { HeaderModule } from '../_shared/components/header/header.module';
import { FooterModule } from '../_shared/components/footer/footer.module';


@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [
    CommonModule,
    NotFoundPageRoutingModule,
    HeaderModule,
    FooterModule
  ]
})
export class NotFoundPageModule { }
