import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { startVoiceAssistant, stopVoiceAssistant } from '../state/actions/voice-assistant.actions';
import { selectVoiceAssistantActive, selectVoiceAssistantSupported } from '../state/selectors/voice-assistant.selectors';
import { selectForceDarkTheme, selectSupportDarkTheme } from '../state/selectors/dark-theme.selector';
import { setForceDarkTheme } from '../state/actions/dark-theme.actions';

@Component({
  selector: 'app-settings-container',
  template: `
    <app-settings-page
      [voiceAssistantSupported] = "voiceAssistantSupported$ | async"
      [voiceAssistantActive]="voiceAssistantActive$ | async"
      [supportDarkTheme]="supportDarkTheme$ | async"
      [forceDarkTheme]="forceDarkTheme$ | async"
      (voiceAssistantToggle)="onVoiceAssistantToggle($event)"
      (darkThemeToggle)="onDarkThemeToggle($event)">
    </app-settings-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsContainerComponent implements OnInit {

  voiceAssistantSupported$: Observable<boolean>;
  voiceAssistantActive$: Observable<boolean>;
  supportDarkTheme$: Observable<boolean>;
  forceDarkTheme$: Observable<boolean>;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.voiceAssistantSupported$ = this.store.select(selectVoiceAssistantSupported);
    this.voiceAssistantActive$ = this.store.select(selectVoiceAssistantActive);
    this.supportDarkTheme$ = this.store.select(selectSupportDarkTheme);
    this.forceDarkTheme$ = this.store.select(selectForceDarkTheme);
  }

  onVoiceAssistantToggle(active: boolean) {
    if (active) {
      this.store.dispatch(startVoiceAssistant());
    } else {
      this.store.dispatch(stopVoiceAssistant());
    }
  }

  onDarkThemeToggle(active: boolean) {
    this.store.dispatch(setForceDarkTheme({ force: active }));
  }

}
