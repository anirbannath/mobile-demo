import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { routerAnimations } from './app-animations';
import { loadContacts } from './_shared/state/actions/contacts.actions';
import { loadNotes } from './_shared/state/actions/notes.actions';
import { loadTags } from './_shared/state/actions/tags.actions';
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

  showFooter$: Observable<boolean>;

  voiceAssistantActive$: Observable<boolean>;
  voiceAssistantInterimTranscript$: Observable<string>;
  voiceAssistantFinalTranscript$: Observable<string>;
  voiceAssistantFinalAcknowledgement$: Observable<string>;

  constructor(
    private store: Store,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.showFooter$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError),
      map(() => this.location.path().indexOf('/note') === -1),
      distinctUntilChanged(),
    );
    this.voiceAssistantActive$ = this.store.select(selectVoiceAssistantActive);
    this.voiceAssistantInterimTranscript$ = this.store.select(selectVoiceAssistantInterimTranscript);
    this.voiceAssistantFinalTranscript$ = this.store.select(selectVoiceAssistantFinalTranscript);
    this.voiceAssistantFinalAcknowledgement$ = this.store.select(selectVoiceAssistantAcknowledgement);
    this.store.dispatch(loadUser());
    this.store.dispatch(loadTags());
    this.store.dispatch(loadContacts());
    this.store.dispatch(loadNotes());
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animationKey;
  }
}
