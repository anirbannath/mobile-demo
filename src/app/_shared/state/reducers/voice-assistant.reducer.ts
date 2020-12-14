import { createReducer, on } from '@ngrx/store';
import { initialState } from '../../models/app-state';
import {
  startVoiceAssistant, stopVoiceAssistant,
  setVoiceAssistantSupport, setVoiceAssistantResult,
  loadAssistantInstruction, setAssistantInstruction, setAssistantAcknowledgement, setAssistantContext
} from '../actions/voice-assistant.actions';

export const voiceAssistantReducer = createReducer(
  initialState,
  on(setVoiceAssistantSupport, (state, { support }) => ({ ...state, data: { ...state.data, isSupported: support } })),
  on(startVoiceAssistant, (state) => ({ ...state, data: { ...state.data, active: true } })),
  on(stopVoiceAssistant, (state) => ({ ...state, data: { ...state.data, active: false } })),
  on(setVoiceAssistantResult, (state, { result }) => ({
    ...state, data: {
      ...state.data,
      finalTranscript: '' || result?.finalTranscript,
      interimTranscript: '' || result?.interimTranscript,
      acknowledgement: ''
    }
  })),

  on(loadAssistantInstruction, (state, { transcript }) => ({ ...state, loading: true })),
  on(setAssistantInstruction, (state, { instruction }) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      instruction: {
        action: instruction?.action,
        target: instruction?.target,
        value: instruction?.value,
      }
    }
  })),

  on(setAssistantAcknowledgement, (state, { acknowledgement }) => ({
    ...state,
    data: {
      ...state.data,
      acknowledgement: acknowledgement
    }
  })),

  on(setAssistantContext, (state, { context }) => ({
    ...state,
    data: {
      ...state.data,
      context: context
    }
  })),

);
