import { createAction, props } from '@ngrx/store';
import { appActions } from '../app-actions';
import { AppInstruction, InstructionResult, SpeechAssistantMeta } from '../../models/voice-assistant';

export const setVoiceAssistantSupport = createAction(appActions.setVoiceAssistantSupport, props<{ support: boolean }>());
export const startVoiceAssistant = createAction(appActions.startVoiceAssistant);
export const stopVoiceAssistant = createAction(appActions.stopVoiceAssistant);
export const setVoiceAssistantResult = createAction(appActions.setVoiceAssistantResult, props<{ result: SpeechAssistantMeta }>());

export const loadAssistantInstruction = createAction(appActions.loadAssistantInstruction, props<{ transcript: string, target?: string }>());
export const setAssistantInstruction = createAction(appActions.setAssistantInstruction, props<{ instruction: InstructionResult }>());
export const errorAssistantInstruction = createAction(appActions.errorAssistantInstruction, props<{ err: any }>());
export const cancelAssistantInstruction = createAction(appActions.cancelAssistantInstruction);

export const setAssistantAcknowledgement = createAction(appActions.setAssistantAcknowledgement, props<{ acknowledgement: string, payload?: AppInstruction }>());
export const actOnAssistantInstruction = createAction(appActions.actOnAssistantInstruction, props<{ payload: any }>());
