import * as natural from 'natural';

export const getObjectTags = (transcript: string) => {
  const language = 'EN';
  const defaultCategory = 'NNP';

  const lexicon = new natural.Lexicon(language, defaultCategory);
  const ruleSet = new natural.RuleSet(language);
  const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

  const tags: any = tagger.tag(new natural.WordTokenizer().tokenize(transcript));

  return tags?.taggedWords as Array<{ token: string, tag: string }>;

}
