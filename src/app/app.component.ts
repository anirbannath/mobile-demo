import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { routerAnimations } from './app-animations';
import { loadNotes } from './state/actions/notes.actions';
import { VoiceRecognitionService } from './services/voice-navigation.service';
import { WebSocketService } from './services/web-socket.service';
import { filter } from 'rxjs/operators'
import { appRoutes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimations]
})
export class AppComponent implements OnInit {

  isVoiceNavigationStarted = false;

  constructor(
    private store: Store,
    private voiceRecognitionService: VoiceRecognitionService,
    private webSocketService: WebSocketService,
    private router: Router
  ) { }

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
        let text = data.toLowerCase();
        appRoutes.forEach(route => {
          if (text.indexOf(route.path) >= 0) {
            this.router.navigateByUrl('/' + route.path);
          }
        }, error => {
          console.log(error);
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
