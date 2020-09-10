import { createReducer, on } from '@ngrx/store';
import { initialState } from '../../models/app-state';
import { startVoiceAssistant, stopVoiceAssistant, setVoiceAssistantSupport, setVoiceAssistantResult } from '../actions/voice-assistant.actions';

export const voiceAssistantReducer = createReducer(
  initialState,
  on(setVoiceAssistantSupport, (state, { support }) => ({ ...state, data: { ...state.data, isSupported: support } })),
  on(startVoiceAssistant, (state) => ({ ...state, data: { ...state.data, active: true } })),
  on(stopVoiceAssistant, (state) => ({ ...state, data: { ...state.data, active: false } })),
  on(setVoiceAssistantResult, (state, { result }) => ({
    ...state, data: {
      ...state.data,
      finalTranscript: result.finalTranscript,
      interimTranscript: result.interimTranscript,
    }
  })),
);
