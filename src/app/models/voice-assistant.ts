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
  action?: string,
  target?: string,
  value?: string | number,
  tags?: Array<any>
}

export interface AppInstruction {
  acknowledgementValue?: string,
  action?: string,
  type?: 'function' | 'action',
  payload?: any,
}
