import { createAction, props } from '@ngrx/store';
import { appActions } from '../app-actions';
import { AppInstruction, InstructionResult, SpeechAssistantMeta } from '../../models/voice-assistant';

export const setVoiceAssistantSupport = createAction(appActions.setVoiceAssistantSupport, props<{ support: boolean }>());
export const startVoiceAssistant = createAction(appActions.startVoiceAssistant, props<{ muted?: boolean }>());
export const stopVoiceAssistant = createAction(appActions.stopVoiceAssistant, props<{ muted?: boolean }>());
export const setVoiceAssistantResult = createAction(appActions.setVoiceAssistantResult, props<{ result: SpeechAssistantMeta }>());

export const loadAssistantInstruction = createAction(appActions.loadAssistantInstruction, props<{ transcript: string, target?: string }>());
export const setAssistantInstruction = createAction(appActions.setAssistantInstruction, props<{ instruction: InstructionResult }>());
export const errorAssistantInstruction = createAction(appActions.errorAssistantInstruction, props<{ err: any }>());
export const cancelAssistantInstruction = createAction(appActions.cancelAssistantInstruction);

export const setAssistantAcknowledgement = createAction(appActions.setAssistantAcknowledgement, props<{ acknowledgement: string, force?: boolean, payload?: AppInstruction }>());
export const actOnAssistantInstruction = createAction(appActions.actOnAssistantInstruction, props<{ payload: any }>());

export const setAssistantContext = createAction(appActions.setAssistantContext, props<{ context: any }>());
