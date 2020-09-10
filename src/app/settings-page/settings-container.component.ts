import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectVoiceAssistantActive, selectVoiceAssistantSupported } from '../state/selectors/voice-assistant.selectors';
import { startVoiceAssistant, stopVoiceAssistant } from '../state/actions/voice-assistant.actions';

@Component({
  selector: 'app-settings-container',
  template: `
    <app-settings-page
      [voiceAssistantSupported] = "voiceAssistantSupported$ | async"
      [voiceAssistantActive]="voiceAssistantActive$ | async"
      (voiceAssistantToggle)="onVoiceAssistantToggle($event)">
    </app-settings-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsContainerComponent implements OnInit {

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
