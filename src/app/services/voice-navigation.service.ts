import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';

declare global {
  var webkitSpeechRecognition: any
}

@Injectable()
export class VoiceRecognitionService {

  public isRecognitionSupported = !!window.webkitSpeechRecognition;
  public text = '';
  recognition: any;
  isStoppedSpeechRecog = false;
  tempWords: string;

  constructor(public _webSocketService: WebSocketService) {
    if (this.isRecognitionSupported && !this.recognition) {
      this.recognition = new window.webkitSpeechRecognition();
    }
  }


  init() {
    if (this.isRecognitionSupported) {
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.addEventListener('result', (e) => {
        const transcript = Array.from(e.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');
        this.tempWords = transcript;
        //console.log(transcript);
      });
    }
  }


  start() {
    if (this.isRecognitionSupported) {
      this.isStoppedSpeechRecog = false;
      this.recognition.start();
      console.log("Speech recognition started")
      this.recognition.addEventListener('end', (condition) => {
        if (this.isStoppedSpeechRecog) {
          this.recognition.stop();
          console.log("End speech recognition")
        } else {
          this.wordConcat();
        }
      });
    }
  }

  stop() {
    if (this.isRecognitionSupported) {
      this.isStoppedSpeechRecog = true;
      this.wordConcat()
      this.recognition.stop();
      console.log("End speech recognition")
    }
  }

  wordConcat() {
    if (this.isRecognitionSupported) {
      this.text = this.text + ' ' + this.tempWords + '.';
      console.log(this.tempWords);
      this._webSocketService.emit('text-event', this.tempWords)
      this.tempWords = '';
    }
  }
}
