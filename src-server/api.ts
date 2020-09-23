import * as express from 'express';
import { InstructionRequest } from './models/instruction';
import { trainActionClassifier } from './utils/classifier';
import processInstruction from './utils/processor';

const router = express.Router();

router.get('/', function (req, res) {
  res.json({ data: 'Appliction APIs work fine.' });
})

router.get('/force-train', async function (req, res) {
  try {
    await trainActionClassifier();
    res.json({ data: 'Training completed.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

router.post('/resolve-instruction', async function (req, res) {
  const request = req.body as InstructionRequest;
  try {
    const result = await processInstruction(request);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

router.all('*', function (req, res) {
  res.status(404).json({ message: 'Not found.' });
})

export default router;

/**
 *
 *  Cancel/Discard
 *  result = {
 *    action: 'navigate',
 *    target: 'application',
 *    value: 'goBack'
 *  }
 *
 *  Take me to home
 *  result = {
 *    action: 'navigate',
 *    target: 'application',
 *    value: 'home'
 *  }
 *
 *  Go to contact
 *  result = {
 *    action: 'navigate',
 *    target: 'application',
 *    value: 'contact'
 *  }
 *
 *  Navigate to client
 *  result = {
 *    action: 'navigate',
 *    target: 'application',
 *    value: 'client'
 *  }
 *
 *  Select first contact
 *  result = {
 *    action: 'select',
 *    target: 'contact',
 *    value: '1'
 *  }
 *
 *  Select second note
 *  result = {
 *    action: 'select',
 *    target: 'note',
 *    value: '2'
 *  }
 *
 */
