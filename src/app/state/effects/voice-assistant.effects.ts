import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
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
    switchMap((finalTranscript) => {
      if (finalTranscript) {
        return environment.envNode ?
          of(loadAssistantInstruction({ transcript: finalTranscript })) :
          of(setAssistantInstruction({ instruction: { action: 'navigate.forward', target: 'application', value: finalTranscript } }));
      } else {
        return EMPTY;
      }
    })
  ));

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
      this.doInstruction(instruction);
      return of(setAssistantAcknowledgement({ acknowledgement: assistantAcknowledgement(instruction) }))
    })
  ));

  doInstruction(instruction: InstructionResult) {
    if (instruction) {
      switch (instruction?.action) {
        case 'navigate.forward':
          const value = instruction?.value?.toLowerCase();
          navigationInstructions.some(route => {
            return route?.navigationKey.some(navigationKey => {
              if (value?.indexOf(navigationKey) >= 0) {
                this.router.navigateByUrl(route.path);
                return true;
              }
            })
          });
          break;

        case 'navigate.back':
          this.location.back();
          break;
      }
    }
  }

}
