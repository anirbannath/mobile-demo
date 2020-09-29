import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent {

  @Input() voiceAssistantSupported: boolean;
  @Input() voiceAssistantActive: boolean;
  @Output() voiceAssistantToggle = new EventEmitter<boolean>();

  onVoiceAssistantToggle() {
    this.voiceAssistantToggle.emit(!this.voiceAssistantActive);
  }

}
