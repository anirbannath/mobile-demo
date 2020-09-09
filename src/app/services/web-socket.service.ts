import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class WebSocketService {
  socket: SocketIOClient.Socket;

  init() {
    if (!this.socket) {
      this.socket = io(environment.voiceNavigatorUrl);
    }
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  stop() {
    this.socket.close();
  }
}
