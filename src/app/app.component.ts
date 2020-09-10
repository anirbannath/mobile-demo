import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { routerAnimations } from './app-animations';
import { loadNotes } from './state/actions/notes.actions';
import { VoiceAssistantService } from './services/voice-assistant.service';
import { WebSocketService } from './services/web-socket.service';
import { appRoutes } from './app-routing.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimations]
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(loadNotes());
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animationKey;
  }
}
