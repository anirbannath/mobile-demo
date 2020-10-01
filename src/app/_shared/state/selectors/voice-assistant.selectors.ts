import { createSelector } from '@ngrx/store';
import { AppState } from '../../models/app-state';

export const selectVoiceAssistant = (state: AppState) => state.voiceAssistant;

export const selectVoiceAssistantSupported = createSelector(
  selectVoiceAssistant,
  (assistant) => assistant?.data?.isSupported
);

export const selectVoiceAssistantActive = createSelector(
  selectVoiceAssistant,
  (assistant) => assistant?.data?.active
);

export const selectVoiceAssistantInterimTranscript = createSelector(
  selectVoiceAssistant,
  (assistant) => assistant?.data?.interimTranscript
);

export const selectVoiceAssistantFinalTranscript = createSelector(
  selectVoiceAssistant,
  (assistant) => assistant?.data?.finalTranscript
);

export const selectVoiceAssistantAcknowledgement = createSelector(
  selectVoiceAssistant,
  (assistant) => assistant?.data?.acknowledgement
);
