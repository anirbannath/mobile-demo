import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBootstrapService } from './app-bootstrap.service';
import { reducers } from './_shared/state/reducers';
import { effects } from './_shared/state/effects';
import { FooterModule } from './_shared/components/footer/footer.module';
import { ToastModule } from './_shared/components/toast/toast.module';

export function bootstrapServiceFactory(bootstrapService: AppBootstrapService) {
  return () => bootstrapService.bootstrap();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'mobileDemo' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    HttpClientModule,
    ToastModule,
    FooterModule
  ],
  providers: [
    AppBootstrapService,
    {
      provide: APP_INITIALIZER,
      useFactory: bootstrapServiceFactory,
      deps: [AppBootstrapService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
