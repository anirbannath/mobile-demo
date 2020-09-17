import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap, tap } from 'rxjs/operators';
import { appActions } from '../../app-actions';
import { VoiceAssistantService } from '../../services/voice-assistant.service';
import { setVoiceAssistantResult } from '../actions/voice-assistant.actions';
import { voiceNavigations } from '../../app-routing.module';
import { SpeechAssistantMeta } from '../../models/voice-assistant';

@Injectable()
export class VoiceAssistantEffects {

  constructor(
    private actions$: Actions,
    private voiceAssistantService: VoiceAssistantService,
    private location: Location,
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
        const finalTranscript = data?.finalTranscript?.toLowerCase();
        if (finalTranscript) {
          voiceNavigations.some(route => {
            return route?.navigationKey.some(navigationKey => {
              if (finalTranscript?.indexOf(navigationKey) >= 0) {
                if (route.path === 'goBack') {
                  this.location.back();
                } else {
                  this.router.navigateByUrl('/' + route.path);
                }
                return true;
              }
            })
          });
        }
      }
    })
  ), { dispatch: false });

}
