export interface InstructionRequest {
  target?: string,
  transcript?: string
}

export interface InstructionResult {
  actions?: Array<any>
  action?: string,
  target?: string,
  value?: string,
  tags?: any
}
