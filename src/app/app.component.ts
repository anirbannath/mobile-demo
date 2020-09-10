import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { routerAnimations } from './app-animations';
import { loadNotes } from './state/actions/notes.actions';
import { VoiceRecognitionService } from './services/voice-navigation.service';
import { WebSocketService } from './services/web-socket.service';
import { appRoutes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimations]
})
export class AppComponent implements OnInit {

  isRecognitionSupported: boolean;
  isVoiceNavigationStarted = false;

  constructor(
    private store: Store,
    private voiceRecognitionService: VoiceRecognitionService,
    private webSocketService: WebSocketService,
    private router: Router
  ) {
    this.isRecognitionSupported = voiceRecognitionService.isRecognitionSupported;
  }

  ngOnInit() {
    this.store.dispatch(loadNotes());
  }

  toggleVoiceNavigation() {
    if (!this.isVoiceNavigationStarted) {
      this.startVoiceNavigation();
    } else {
      this.stopVoiceNavigation();
    }
  }

  startVoiceNavigation() {
    this.voiceRecognitionService.init();
    this.webSocketService.init();
    this.voiceRecognitionService.start();
    this.webSocketService.listen('formattedtext-event').subscribe((data: string) => {
      console.log("Final Data ", data);
      if (data) {
        const text = data.toLowerCase(),
          words = text.split(' ');
        appRoutes.some(route => {
          return words.some(word => {
            if (route.data.navigationKey && route.data.navigationKey.indexOf(word) >= 0) {
              this.router.navigateByUrl('/' + route.path);
              return true;
            }
          });
        })
      }
    });
    this.isVoiceNavigationStarted = true;
  }

  stopVoiceNavigation() {
    this.voiceRecognitionService.stop();
    this.webSocketService.stop();
    this.isVoiceNavigationStarted = false;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animationKey;
  }
}
