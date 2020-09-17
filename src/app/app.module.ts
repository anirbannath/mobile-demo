import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBootstrapService } from './app-bootstrap.service';
import { reducers } from './state/reducers';
import { effects } from './state/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterModule } from './footer/footer.module';
import { WebSocketService } from './services/web-socket.service';
import { VoiceAssistantService } from './services/voice-assistant.service';
import { ToastModule } from './toast/toast.module';

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
    },
    VoiceAssistantService,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
