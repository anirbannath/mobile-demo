import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { routerAnimations } from './app-animations';
import { loadNotes } from './state/actions/notes.actions';
import { loadUser } from './state/actions/user.actions';
import { selectVoiceAssistantFinalTranscript, selectVoiceAssistantInterimTranscript } from './state/selectors/voice-assistant.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimations]
})
export class AppComponent implements OnInit {

  voiceAssistantInterimTranscript$: Observable<string>;
  voiceAssistantFinalTranscript$: Observable<string>;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.voiceAssistantInterimTranscript$ = this.store.select(selectVoiceAssistantInterimTranscript);
    this.voiceAssistantFinalTranscript$ = this.store.select(selectVoiceAssistantFinalTranscript);
    this.store.dispatch(loadUser());
    this.store.dispatch(loadNotes());
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animationKey;
  }
}
