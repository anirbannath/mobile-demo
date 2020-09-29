import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, tap, switchMap, distinctUntilChanged, catchError } from 'rxjs/operators';
import { appActions } from '../../app-actions';
import { VoiceAssistantService } from '../../services/voice-assistant.service';
import { InstructionAssistantService } from '../../services/instruction-assistant.service';
import { loadAssistantInstruction, setAssistantInstruction, setVoiceAssistantResult, setAssistantAcknowledgement } from '../actions/voice-assistant.actions';
import { navigationInstructions } from '../../app-routing.module';
import { InstructionResult } from '../../models/voice-assistant';
import { environment } from '../../../environments/environment';
import { assistantAcknowledgement } from '../../services/assistant-util';

@Injectable()
export class VoiceAssistantEffects {

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private actions$: Actions,
    private voiceAssistantService: VoiceAssistantService,
    private instructionAssistantService: InstructionAssistantService,
    private location: Location,
    private router: Router
  ) { }

  startVoiceAssistant = createEffect(() => this.actions$.pipe(
    ofType(appActions.startVoiceAssistant),
    switchMap(() => {
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
    map(action => (<any>action)?.result?.finalTranscript as string),
    distinctUntilChanged(),
    switchMap((finalTranscript) =>
      finalTranscript ? of(loadAssistantInstruction({ transcript: finalTranscript })) : EMPTY)));

  onLoadAssistantInstruction = createEffect(() => this.actions$.pipe(
    ofType(appActions.loadAssistantInstruction),
    switchMap((action) => {
      const transcript = (<any>action)?.transcript;
      const request = { transcript: transcript };
      return this.instructionAssistantService.resolve(request).pipe(
        map(data => setAssistantInstruction({ instruction: data })),
        catchError(() => EMPTY)
      )
    })
  ));

  onSetAssistantInstruction = createEffect(() => this.actions$.pipe(
    ofType(appActions.setAssistantInstruction),
    switchMap((action) => {
      const instruction: InstructionResult = (<any>action).instruction;
      return of(setAssistantAcknowledgement(this.doInstruction(instruction)))
    })
  ));

  onSetAssistantAcknowledgement = createEffect(() => this.actions$.pipe(
    ofType(appActions.setAssistantAcknowledgement),
    switchMap((action) => {
      const acknowledgement: string = (<any>action).acknowledgement;
      if (isPlatformBrowser(this.platformId) && window.speechSynthesis && acknowledgement) {
        const msg = new SpeechSynthesisUtterance();
        msg.text = acknowledgement;
        window.speechSynthesis.speak(msg);
      }
      return (<any>action).appAction ? of((<any>action).appAction) : EMPTY;
    })
  ));

  doInstruction(instruction: InstructionResult) {
    let confirmedInstruction = { ...instruction };
    let appAction: any;
    if (instruction) {
      switch (`${instruction?.action}.${instruction?.target}`) {
        case 'navigate.forward':
          const value = instruction?.value?.toLowerCase();
          const navigationSuccess = navigationInstructions.some(route => {
            return route?.navigationKey.some(navigationKey => {
              if (value?.indexOf(navigationKey) >= 0) {
                this.router.navigateByUrl(route.path);
                return true;
              }
            })
          });
          if (!navigationSuccess) {
            confirmedInstruction = {
              ...instruction,
              action: 'navigate.unknown'
            }
          }
          break;

        case 'navigate.back':
          this.location.back();
          break;
      }
    }

    return {
      acknowledgement: assistantAcknowledgement(confirmedInstruction),
      appAction: appAction
    };
  }

}
