import { InstructionRequest, InstructionResult } from '../models/instruction';
import { loadActionClassifier } from './classifier';
import { getObjectTags } from './tagger';
import { ACTIONS, TARGETS } from './constants';

const processInstruction = async (request: InstructionRequest) => {

  if (!request?.transcript) {
    return {
      action: 'unknown'
    } as InstructionResult;
  }

  const tags = getObjectTags(request.transcript);

  let action: string, target = request?.target;
  ACTIONS.some(_action => {
    return _action.commands.some(_command => {
      if (new RegExp(_command, 'i').test(request.transcript)) {
        action = _action.name;
        return true;
      }
    })
  })
  if (!target && TARGETS[action]) {
    TARGETS[action].some(_target => {
      if (_target.isFallback) {
        target = _target.name;
        return true;
      } else {
        return _target.commands.some(_command => {
          if (new RegExp(_command, 'i').test(request.transcript)) {
            target = _target.name;
            return true;
          }
        })
      }
    })
  }

  const value = tags.filter(tag => tag.token.toLowerCase().indexOf('setting') >= 0 || tag.tag.indexOf('NN') >= 0)
    .map(tag => tag.token).join(' ');

  const result: InstructionResult = {
    action: action || 'unknown',
    target: target,
    value: value,
    tags: tags
  };
  return result;

}

const processInstruction2 = async (request: InstructionRequest) => {

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
