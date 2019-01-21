// @flow
import type { TranslateMatchersErrors } from './types';

const translateMatchersErrors: TranslateMatchersErrors =
  (matcherErrors, params) => {
    const { key, translate } = params;
    return matcherErrors.map((matcherError) => {
      return {
        ...matcherError,
        [key]: translate(matcherError.key, matcherError.checkResult),
      };
    });
  };

module.exports = translateMatchersErrors;
