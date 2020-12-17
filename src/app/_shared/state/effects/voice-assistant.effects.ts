import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { map, switchMap, distinctUntilChanged, catchError, withLatestFrom, mergeAll, concatAll } from 'rxjs/operators';
import { appActions } from '../app-actions';
import { VoiceAssistantService } from '../../services/voice-assistant.service';
import { InstructionAssistantService } from '../../services/instruction-assistant.service';
import {
  loadAssistantInstruction, setAssistantInstruction,
  setVoiceAssistantResult, setAssistantAcknowledgement, setAssistantContext
} from '../actions/voice-assistant.actions';
import { navigationInstructions } from '../../../app-routing.module';
import { AppInstruction, InstructionResult } from '../../models/voice-assistant';
import { assistantAcknowledgement } from '../../services/assistant-util';
import { setSelectedNote } from '../actions/notes.actions';
import { setSelectedContact } from '../actions/contacts.actions';
import { selectUserData } from '../selectors/user.selectors';
import { selectNotesList } from '../selectors/notes.selectors';
import { selectContactsList } from '../selectors/contacts.selectors';
import { selectVoiceAssistantActive, selectVoiceAssistantContext } from '../selectors/voice-assistant.selectors';
import { Note } from '../../models/note';
import { Contact } from '../../models/contact';
import { AppStoreService } from '../../services/app-store.service';

@Injectable()
export class VoiceAssistantEffects {

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private actions$: Actions,
    private store: Store,
    private voiceAssistantService: VoiceAssistantService,
    private instructionAssistantService: InstructionAssistantService,
    private location: Location,
    private router: Router,
    private ngZone: NgZone,
    private appStore: AppStoreService
  ) { }

  startVoiceAssistant = createEffect(() => this.actions$.pipe(
    ofType(appActions.startVoiceAssistant),
    withLatestFrom(this.store.select(selectUserData)),
    switchMap(([action, user]) => {
      this.voiceAssistantService.start();
      const hourOfDay = new Date(Date.now()).getHours();
      let greetingMessage = 'Hello';
      if (hourOfDay < 12) {
        greetingMessage = 'Good morning';
      } else if (hourOfDay >= 12 && hourOfDay <= 14) {
        greetingMessage = 'Good Afternoon';
      } else if (hourOfDay <= 20) {
        greetingMessage = 'Good evening';
      }
      this.appStore.isAssistantActive = true;
      return (<any>action).muted ?
        [
          of(setAssistantAcknowledgement({ acknowledgement: '' })),
          this.voiceAssistantService.result().pipe(
            map((data) => setVoiceAssistantResult({ result: data })))
        ] : [
          of(setAssistantAcknowledgement({ acknowledgement: `${greetingMessage} ${user?.firstName}.` })),
          this.voiceAssistantService.result().pipe(
            map((data) => setVoiceAssistantResult({ result: data })))
        ]
    }),
    mergeAll()
  ));

  stopVoiceAssistant = createEffect(() => this.actions$.pipe(
    ofType(appActions.stopVoiceAssistant),
    switchMap((action) => {
      this.voiceAssistantService.stop();
      this.appStore.isAssistantActive = false;
      return (<any>action).muted ? of(setAssistantAcknowledgement({ acknowledgement: '' })) :
        of(setAssistantAcknowledgement({ acknowledgement: 'Good bye.', force: true }))
    })
  ));

  onVoiceAssistantResult = createEffect(() => this.actions$.pipe(
    ofType(appActions.setVoiceAssistantResult),
    map(action => (<any>action)?.result?.finalTranscript as string),
    distinctUntilChanged(),
    withLatestFrom(
      this.store.select(selectUserData),
      this.store.select(selectVoiceAssistantContext)
    ),
    switchMap(([finalTranscript, user, currentContext]) => {
      if (finalTranscript) {
        if (currentContext && finalTranscript.toLowerCase() === 'yes') {
          switch (currentContext.type) {
            case 'DOM':
              if (isPlatformBrowser(this.platformId)) {
                const block = <HTMLElement>document.querySelector(currentContext.target);
                return [
                  of(setAssistantContext({
                    context: {
                      ...currentContext,
                      text: block.innerText.replace(/\s+/g, ' '),
                    }
                  })),
                  of(setAssistantContext({
                    context: null
                  }))
                ];
              }
              break;
          }
        } else if (currentContext && finalTranscript.toLowerCase() === 'no') {
          return [
            of(setAssistantContext({
              context: null
            }))
          ]
        } else {
          if (this.location.path(true) === '/start') {
            if (finalTranscript.toLowerCase().indexOf('agree') >= 0) {
              this.router.navigate(['home']);
              return [
                of(setAssistantAcknowledgement({ acknowledgement: `Welcome ${user?.firstName}!` })),
                of(setAssistantContext({
                  context: null
                }))
              ]
            } else {
              return [
                of(setAssistantAcknowledgement({ acknowledgement: `You need to say "I Agree" to proceed!` })),
                of(setAssistantContext({
                  context: null
                }))
              ]
            }
          } else {
            let isPromptAction = false;
            if (isPlatformBrowser(this.platformId)) {
              const matchedCommandElement = this.getElementByCommand(finalTranscript);
              if (matchedCommandElement) {
                switch (matchedCommandElement.action) {
                  case 'click':
                    return [
                      of(setAssistantAcknowledgement({
                        acknowledgement: matchedCommandElement.reply,
                        payload: { type: 'function', payload: () => { matchedCommandElement.element.click() } }
                      })),
                      of(setAssistantContext({
                        context: null
                      }))
                    ]
                }
                isPromptAction = true;
              }
              else if (finalTranscript === 'next control' || finalTranscript === 'next field' || finalTranscript === 'tab') {
                this.getFocusableElement(1)?.focus();
                isPromptAction = true;
              } else if (finalTranscript === 'previous control' || finalTranscript === 'previous field') {
                this.getFocusableElement(-1)?.focus();
                isPromptAction = true;
              } else if (document.activeElement?.getAttributeNames()?.findIndex(attr => attr === 'va-editable') > -1) {
                (<any>document.activeElement).value += ((<any>document.activeElement).value ? ' ' : '') + finalTranscript;
                if (document.activeElement.nodeName === 'TEXTAREA' || document.activeElement.nodeName === 'INPUT') {
                  document.activeElement.dispatchEvent(new Event('input'));
                }
                isPromptAction = true;
              }
            }

            if (!isPromptAction) {
              const target = navigationInstructions.filter(nav => nav.path === this.location.path(true))[0]?.target;
              return [
                of(loadAssistantInstruction({
                  transcript: finalTranscript,
                  target: target
                })),
                of(setAssistantContext({
                  context: null
                }))
              ]
            }
          }
        }
      }
      return EMPTY;
    }),
    concatAll()
  ));

  onLoadAssistantInstruction = createEffect(() => this.actions$.pipe(
    ofType(appActions.loadAssistantInstruction),
    switchMap((action) => {
      const request = {
        transcript: (<any>action)?.transcript,
        target: (<any>action)?.target
      };
      return this.instructionAssistantService.resolve(request).pipe(
        map(data => setAssistantInstruction({ instruction: data })),
        catchError(() => EMPTY)
      )
    })
  ));

  onSetAssistantInstruction = createEffect(() => this.actions$.pipe(
    ofType(appActions.setAssistantInstruction),
    withLatestFrom(
      this.store.select(selectNotesList),
      this.store.select(selectContactsList)
    ),
    switchMap(([action, notes, contacts]) => {
      const instruction: InstructionResult = (<any>action).instruction;
      const result = this.getInstruction(instruction, notes, contacts);
      const acknowledgement = assistantAcknowledgement(result);
      return of(setAssistantAcknowledgement({ acknowledgement: acknowledgement, payload: result }))
    })
  ));

  onSetAssistantAcknowledgement = createEffect(() => this.actions$.pipe(
    ofType(appActions.setAssistantAcknowledgement),
    withLatestFrom(
      this.store.select(selectVoiceAssistantActive)
    ),
    switchMap(([action, isActive]) => {
      if (isActive || (<any>action).force) {
        return new Observable<Action>(subscriber => {
          const acknowledgement: string = (<any>action).acknowledgement;
          const instruction: AppInstruction = (<any>action).payload;
          if (isPlatformBrowser(this.platformId) && window.speechSynthesis) {
            const msg = new SpeechSynthesisUtterance();
            msg.text = acknowledgement;
            window.speechSynthesis.speak(msg);
            msg.onend = () => {
              if (instruction && instruction.payload) {
                this.ngZone.run(() => {
                  if (instruction.type === 'action') {
                    subscriber.next(instruction.payload)
                  } else {
                    instruction.payload();
                  }
                  subscriber.complete();
                })
              } else {
                subscriber.complete();
              }
            }
          } else {
            subscriber.complete();
          }
        })
      }
      return EMPTY;
    })
  ));

  onSetContext = createEffect(() => this.actions$.pipe(
    ofType(appActions.setAssistantContext),
    switchMap((action) => {
      const context = (<any>action).context;
      if (context) {
        switch (context.type) {
          case 'DOM':
            return of(setAssistantAcknowledgement({ acknowledgement: context.text }));
            break;
        }
      }
      return EMPTY;
    })
  ));

  getInstruction(instruction: InstructionResult, notes: Array<Note>, contacts: Array<Contact>) {
    let appInstruction: AppInstruction = {
      action: `unknown`
    };
    const instructionAction = instruction?.action && instruction?.target ? `${instruction?.action}.${instruction?.target}` : '';
    switch (instructionAction) {
      case 'navigate.forward':
        const value = instruction?.value && typeof instruction.value === 'string' ?
          instruction.value.toLowerCase() : instruction.value + '';
        const navigationSuccess = navigationInstructions.some(_route => {
          return _route?.navigationKey.some(_navigationKey => {
            if (value === _navigationKey) {
              appInstruction = {
                acknowledgementValue: _route.name,
                action: instructionAction,
                type: 'function',
                payload: () => { this.router.navigateByUrl(_route.path) }
              }
              return true;
            }
          })
        });
        if (!navigationSuccess) {
          appInstruction = {
            action: `${instruction?.action}.unknown`
          }
        }
        break;

      case 'navigate.back':
        appInstruction = {
          action: instructionAction,
          type: 'function',
          payload: () => { this.location.back() }
        }
        break;

      case 'select.note':
        let selectedNote: Note = null;
        {
          const search = instruction.value;
          if (!isNaN(+search)) {
            selectedNote = notes[+search - 1];
          } else {
            if (search && notes?.length > 0) {
              notes.some(_note => {
                if (new RegExp('' + search, 'i').test(_note.title)) {
                  selectedNote = _note;
                  return true;
                }
              })
            }
          }
        }
        if (selectedNote) {
          appInstruction = {
            acknowledgementValue: selectedNote.title,
            action: instructionAction,
            type: 'action',
            payload: setSelectedNote({ id: selectedNote.id })
          }
        } else {
          appInstruction = {
            action: `${instructionAction}.unknown`
          }
        }
        break;

      case 'select.contact':
        let selectedContact: Contact = null;
        {
          const search = instruction.value;
          if (!isNaN(+search)) {
            selectedContact = contacts[+search - 1];
          } else {
            if (search && contacts?.length > 0) {
              contacts.some(_contact => {
                if (new RegExp('' + search, 'i').test(`${_contact.firstName} ${_contact.lastName}`)) {
                  selectedContact = _contact;
                  return true;
                }
              })
            }
          }
        }
        if (selectedContact) {
          appInstruction = {
            acknowledgementValue: `${selectedContact.firstName} ${selectedContact.lastName}`,
            action: instructionAction,
            type: 'action',
            payload: setSelectedContact({ id: selectedContact.id })
          }
        } else {
          appInstruction = {
            action: `${instructionAction}.unknown`
          }
        }
        break;
    }

    return appInstruction;
  }

  private getFocusableElement(offset: number): any {
    const focusableElements = document.querySelectorAll('[va-editable]');
    let focusedindex: number;
    for (let index = 0; index < focusableElements.length; index++) {
      const element = focusableElements.item(index);
      if (document.activeElement === element) {
        focusedindex = index;
        break;
      }
    }
    let nextIndex = focusedindex + offset;
    if (nextIndex >= focusableElements.length) {
      nextIndex = 0;
    } else if (nextIndex <= -1) {
      nextIndex = focusableElements.length - 1;
    }
    return focusableElements.item(nextIndex);
  }

  private getElementByCommand(transcript: string) {
    let matchedElement: { element: HTMLElement, action: string, reply: string };
    if (transcript) {
      const vaCommandElement = document.querySelectorAll('[va-command]');
      for (let index = 0; index < vaCommandElement.length; index++) {
        const element = vaCommandElement.item(index);
        const commands = element.getAttribute('va-command')?.split(',');
        const matchFound = commands.some(command => {
          if (transcript.indexOf(command) > -1) {
            matchedElement = {
              element: <HTMLElement>element,
              action: element.getAttribute('va-command-action') || 'click',
              reply: element.getAttribute('va-command-reply')
            };
            return true;
          }
        });
        if (matchFound) {
          break;
        }
      }
    }
    return matchedElement;
  }

}
