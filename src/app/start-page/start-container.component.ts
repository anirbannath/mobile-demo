import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { startVoiceAssistant, stopVoiceAssistant } from '../_shared/state/actions/voice-assistant.actions';
import { selectVoiceAssistantSupported, selectVoiceAssistantActive } from '../_shared/state/selectors/voice-assistant.selectors';

@Component({
  selector: 'app-start-container',
  template: `
    <app-start-page
      [voiceAssistantSupported] = "voiceAssistantSupported$ | async"
      [voiceAssistantActive]="voiceAssistantActive$ | async"
      (voiceAssistantToggle)="onVoiceAssistantToggle($event)">
    </app-start-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartContainerComponent implements OnInit {

  voiceAssistantSupported$: Observable<boolean>;
  voiceAssistantActive$: Observable<boolean>;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.voiceAssistantSupported$ = this.store.select(selectVoiceAssistantSupported);
    this.voiceAssistantActive$ = this.store.select(selectVoiceAssistantActive);
  }

  onVoiceAssistantToggle(active: boolean) {
    if (active) {
      this.store.dispatch(startVoiceAssistant());
    } else {
      this.store.dispatch(stopVoiceAssistant());
    }
  }

}
