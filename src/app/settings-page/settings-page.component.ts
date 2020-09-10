import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {

  @Input() voiceAssistantSupported: boolean;
  @Input() voiceAssistantActive: boolean;
  @Output() voiceAssistantToggle = new EventEmitter<boolean>();

  onVoiceAssistantToggle() {
    this.voiceAssistantToggle.emit(!this.voiceAssistantActive);
  }

}
