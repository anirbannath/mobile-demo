import { AppState } from '../../models/app-state';
import { createSelector } from '@ngrx/store';

export const selectVoiceAssistant = (state: AppState) => state.voiceAssistant;

export const selectVoiceAssistantSupported = createSelector(
  selectVoiceAssistant,
  (assistant) => assistant.data && assistant.data.isSupported
);

export const selectVoiceAssistantActive = createSelector(
  selectVoiceAssistant,
  (assistant) => assistant.data && assistant.data.active
);

export const selectVoiceAssistantFinalTranscript = createSelector(
  selectVoiceAssistant,
  (assistant) => assistant.data && assistant.data.finalTranscript
);

export const selectVoiceAssistantInterimTranscript = createSelector(
  selectVoiceAssistant,
  (assistant) => assistant.data && assistant.data.interimTranscript
);
