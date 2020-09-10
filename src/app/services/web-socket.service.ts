import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class WebSocketService {
  socket: SocketIOClient.Socket;

  start() {
    if (!this.socket || this.socket.disconnected) {
      this.socket = io(environment.voiceNavigatorUrl);
    }
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket && this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket && this.socket.emit(eventName, data);
  }

  stop() {
    this.socket && this.socket.disconnect();
  }
}
