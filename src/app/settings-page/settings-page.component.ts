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
  @Input() supportDarkTheme: boolean;
  @Input() forceDarkTheme: boolean;
  @Output() voiceAssistantToggle = new EventEmitter<boolean>();
  @Output() darkThemeToggle = new EventEmitter<boolean>();

  onVoiceAssistantToggle() {
    this.voiceAssistantToggle.emit(!this.voiceAssistantActive);
  }

  onDarkThemeToggle() {
    this.darkThemeToggle.emit(!this.forceDarkTheme);
  }

}
