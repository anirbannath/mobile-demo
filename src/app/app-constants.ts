import { InstructionResult } from './models/voice-assistant';

export const ASSISTANT_ACKNOWLEDGEMENT = {
  'navigate.forward': `Navigating to $value`,
  'select': `Selecting $value`
}

export const ASSISTANT_ACKNOWLEDGEMENT_NOT_FOUND = [
  `Sorry, I didn't get you`,
  `Sorry, I could not understand you`,
  `Sorry, I could not quite understand you`,
];

const getRndInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const assistantAcknowledgementNotFound = () => {
  return ASSISTANT_ACKNOWLEDGEMENT_NOT_FOUND[getRndInteger(0, ASSISTANT_ACKNOWLEDGEMENT_NOT_FOUND.length - 1)];
}

export const assistantAcknowledgement = (instruction: InstructionResult) => {
  if (instruction?.action && ASSISTANT_ACKNOWLEDGEMENT[instruction.action]) {
    const responseMeta: string = ASSISTANT_ACKNOWLEDGEMENT[instruction.action];
    return responseMeta.replace('$value', instruction.value);
  } else {
    return assistantAcknowledgementNotFound();
  }
};
