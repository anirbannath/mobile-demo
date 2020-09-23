import { InstructionRequest, InstructionResult } from '../models/instruction';
import { loadActionClassifier } from './classifier';
import { getObjectTags } from './tagger';

const processInstruction = async (request: InstructionRequest) => {

  if (!request?.transcript) {
    return {} as InstructionResult;
  }

  const classifier = await loadActionClassifier();
  // const action = classifier.classify(request.transcript);
  const actions = classifier.getClassifications(request.transcript);
  const action = actions.filter(_action => _action.value > 0.5)
    .sort((_actionPrev, _actionNext) => _actionNext.value - _actionPrev.value)[0]?.label;

  const tags = getObjectTags(request?.transcript);
  const value = tags.filter(tag => tag.token.toLowerCase().indexOf('setting') >= 0 || tag.tag.indexOf('NN') >= 0)
    .map(tag => tag.token).join(' ');

  const result: InstructionResult = {
    actions: actions,
    action: action || 'unknown',
    target: 'application',
    value: value,
    tags: tags
  };
  return result;

}

export default processInstruction;
