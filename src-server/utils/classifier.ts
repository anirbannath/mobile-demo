import * as natural from 'natural';
import { join } from 'path';
import { actionClassifierData } from './classifier-data';

export const trainActionClassifier = () => {
  return new Promise<natural.LogisticRegressionClassifier>((resolve, reject) => {

    const actionClassifier = new natural.LogisticRegressionClassifier();

    actionClassifierData.forEach((data) => {
      actionClassifier.addDocument(data.text, data.stem);
    });

    actionClassifier.train();

    actionClassifier.save(join(__dirname, 'actionClassifier.json'), (err, classifier) => {
      if (err) {
        reject(new Error(err))
      }
      resolve(classifier);
    });

  })
}

export const loadActionClassifier = () => {
  return new Promise<natural.LogisticRegressionClassifier>((resolve, reject) => {

    natural.LogisticRegressionClassifier.load(join(__dirname, 'actionClassifier.json'), null, (err, classifier) => {
      if (err) {
        reject(new Error(err))
      }
      resolve(classifier);
    });

  })
}
