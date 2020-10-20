import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { routerAnimations } from './app-animations';
import { loadNotes } from './_shared/state/actions/notes.actions';
import { loadUser } from './_shared/state/actions/user.actions';
import {
  selectVoiceAssistantAcknowledgement, selectVoiceAssistantActive, selectVoiceAssistantFinalTranscript,
  selectVoiceAssistantInterimTranscript
} from './_shared/state/selectors/voice-assistant.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimations]
})
export class AppComponent implements OnInit {

  voiceAssistantActive$: Observable<boolean>;
  voiceAssistantInterimTranscript$: Observable<string>;
  voiceAssistantFinalTranscript$: Observable<string>;
  voiceAssistantFinalAcknowledgement$: Observable<string>;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.voiceAssistantActive$ = this.store.select(selectVoiceAssistantActive);
    this.voiceAssistantInterimTranscript$ = this.store.select(selectVoiceAssistantInterimTranscript);
    this.voiceAssistantFinalTranscript$ = this.store.select(selectVoiceAssistantFinalTranscript);
    this.voiceAssistantFinalAcknowledgement$ = this.store.select(selectVoiceAssistantAcknowledgement);
    this.store.dispatch(loadUser());
    this.store.dispatch(loadNotes());
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animationKey;
  }
}
