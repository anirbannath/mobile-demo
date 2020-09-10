import { createAction, props } from '@ngrx/store';
import { appActions } from '../../app-actions';
import { SpeechAssistantMeta } from '../../models/voice-assistant';

export const setVoiceAssistantSupport = createAction(appActions.setVoiceAssistantSupport, props<{ support: boolean }>());
export const startVoiceAssistant = createAction(appActions.startVoiceAssistant);
export const stopVoiceAssistant = createAction(appActions.stopVoiceAssistant);
export const setVoiceAssistantResult = createAction(appActions.setVoiceAssistantResult, props<{ result: SpeechAssistantMeta }>());
