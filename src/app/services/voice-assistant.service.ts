import { Injectable } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpeechAssistantMeta } from '../models/voice-assistant';

declare global {
  var webkitSpeechRecognition: any
}

@Injectable()
export class VoiceAssistantService {

  public isSupported = !!window.webkitSpeechRecognition;
  private recognition: any;

  constructor() {
    if (this.isSupported && !this.recognition) {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    }
  }

  result(): Observable<SpeechAssistantMeta> {
    if (this.recognition) {
      return fromEvent(this.recognition, 'result').pipe(map((event: any) => {
        const result: SpeechAssistantMeta = {
          finalTranscript: '',
          interimTranscript: ''
        };
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            result.finalTranscript += event.results[i][0].transcript;
          } else {
            result.interimTranscript += event.results[i][0].transcript;
          }
        }
        result.finalTranscript = result.finalTranscript.trim();
        result.interimTranscript = result.interimTranscript.trim();
        return result;
      }));
    } else {
      return of({ finalTranscript: '', interimTranscript: '' });
    }
  }

  start() {
    if (this.recognition) {
      this.recognition.start();
      console.log('Starting speech recognition...');
      this.recognition.onstart = () => {
        console.log('Speech recognition started.')
      }
    }
  }

  stop() {
    if (this.recognition) {
      this.recognition.stop();
      console.log("Stopping speech recognition...");
      this.recognition.onend = () => {
        console.log('Speech recognition stopped.')
      }
    }
  }
}
