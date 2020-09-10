import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap, tap } from 'rxjs/operators';
import { appActions } from '../../app-actions';
import { VoiceAssistantService } from '../../services/voice-assistant.service';
import { setVoiceAssistantResult } from '../actions/voice-assistant.actions';
import { appRoutes } from '../../app-routing.module';
import { SpeechAssistantMeta } from '../../models/voice-assistant';

@Injectable()
export class VoiceAssistantEffects {

  constructor(
    private actions$: Actions,
    private voiceAssistantService: VoiceAssistantService,
    private router: Router
  ) { }

  startVoiceAssistant = createEffect(() => this.actions$.pipe(
    ofType(appActions.startVoiceAssistant),
    concatMap(() => {
      this.voiceAssistantService.start();
      return this.voiceAssistantService.result().pipe(
        map((data) => setVoiceAssistantResult({ result: data }))
      )
    })
  ));

  stopVoiceAssistant = createEffect(() => this.actions$.pipe(
    ofType(appActions.stopVoiceAssistant),
    tap(() => {
      this.voiceAssistantService.stop();
    })
  ), { dispatch: false });

  onVoiceAssistantResult = createEffect(() => this.actions$.pipe(
    ofType(appActions.setVoiceAssistantResult),
    tap((action) => {
      const data: SpeechAssistantMeta = (<any>action).result;
      if (data) {
        console.log(data.interimTranscript);
        const text = data.finalTranscript && data.finalTranscript.toLowerCase();
        if (text) {
          console.log('Final: ' + text);
          const words = text.split(' ');
          appRoutes.some(route => {
            return words.some(word => {
              if (route.data && route.data.navigationKey && route.data.navigationKey.indexOf(word) >= 0) {
                this.router.navigateByUrl('/' + route.path);
                return true;
              }
            })
          });
        }
      }
    })
  ), { dispatch: false });

}
