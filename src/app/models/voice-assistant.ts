export interface SpeechAssistantMeta {
  isSupported?: boolean,
  active?: boolean,
  finalTranscript?: string,
  interimTranscript?: string,
  instruction?: InstructionResult,
  acknowledgement?: string
}

export interface InstructionRequest {
  target?: string,
  transcript?: string
}

export interface InstructionResult {
  action?: InstructionAction,
  target?: string,
  value?: string
}

export type InstructionAction = 'navigate.forward' | 'navigate.back' | 'select' | 'unknown';
