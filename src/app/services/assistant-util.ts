import { AppInstruction } from '../models/voice-assistant';

export const ASSISTANT_ACKNOWLEDGEMENT = {
  'navigate.back': `Navigating to previous page.`,
  'navigate.forward': `Navigating to $value.`,

  'select.note': `Selecting note: $value`,
  'select.note.unknown': `Sorry, I couldn't find the note you are searching for.`,

  'select.contact': `Selecting contact: $value`,
  'select.contact.unknown': `Sorry, I couldn't find the contact you are searching for.`,

  'navigate.unknown': `Sorry, but I couldn't find the page you are asking for.`,
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

export const assistantAcknowledgement = (instruction: AppInstruction) => {
  const command = instruction?.action;
  if (command && ASSISTANT_ACKNOWLEDGEMENT[command]) {
    const responseMeta: string = ASSISTANT_ACKNOWLEDGEMENT[command];
    return instruction?.acknowledgementValue ?
      responseMeta.replace('$value', instruction.acknowledgementValue) : responseMeta;
  } else {
    return assistantAcknowledgementNotFound();
  }
};
