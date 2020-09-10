import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';

declare var webkitSpeechRecognition: any;

@Injectable()
export class VoiceRecognitionService {

  public isRecognitionSupported = !!webkitSpeechRecognition;
  public text = '';
  recognition: any;
  isStoppedSpeechRecog = false;
  tempWords: string;

  constructor(public _webSocketService: WebSocketService) {
    if (webkitSpeechRecognition && !this.recognition) {
      this.recognition = new webkitSpeechRecognition();
    }
  }


  init() {
    if (webkitSpeechRecognition) {
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
    if (webkitSpeechRecognition) {
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
    if (webkitSpeechRecognition) {
      this.isStoppedSpeechRecog = true;
      this.wordConcat()
      this.recognition.stop();
      console.log("End speech recognition")
    }
  }

  wordConcat() {
    if (webkitSpeechRecognition) {
      this.text = this.text + ' ' + this.tempWords + '.';
      console.log(this.tempWords);
      this._webSocketService.emit('text-event', this.tempWords)
      this.tempWords = '';
    }
  }
}
