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
import { assistantAcknowledgement } from '../../services/assistant-util';
import { selectNote } from '../actions/notes.actions';
import { selectContact } from '../actions/contacts.actions';

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
      const target = navigationInstructions.filter(nav => nav.path === this.location.path(true))[0]?.target;
      const request = {
        transcript: transcript,
        target: target
      };
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
      const result = this.doInstruction(instruction);
      return result.appAction ?
        of(result.appAction) : of(setAssistantAcknowledgement({ acknowledgement: result.acknowledgement }))
    })
  ));

  onSetAssistantAcknowledgement = createEffect(() => this.actions$.pipe(
    ofType(appActions.setAssistantAcknowledgement),
    tap((action) => {
      const acknowledgement: string = (<any>action).acknowledgement;
      if (isPlatformBrowser(this.platformId) && window.speechSynthesis && acknowledgement) {
        const msg = new SpeechSynthesisUtterance();
        msg.text = acknowledgement;
        window.speechSynthesis.speak(msg);
      }
    })
  ), { dispatch: false });

  doInstruction(instruction: InstructionResult) {
    let confirmedInstruction = { ...instruction };
    let appAction: any;
    if (instruction) {
      switch (`${instruction?.action}.${instruction?.target}`) {
        case 'navigate.forward':
          const value = instruction?.value?.toLowerCase();
          const navigationSuccess = navigationInstructions.some(route => {
            return route?.navigationKey.some(_navigationKey => {
              if (value === _navigationKey) {
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

        case 'select.note':
          appAction = selectNote({ search: instruction.value })
          break;

        case 'select.contact':
          appAction = selectContact({ search: instruction.value })
          break;
      }
    }

    return {
      acknowledgement: appAction ? '' : assistantAcknowledgement(confirmedInstruction),
      appAction: appAction
    };
  }

}
