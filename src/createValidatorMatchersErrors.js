// @flow
import type {
  CreateValidatorMatchersErrors,
  MatcherError,
} from './types.flow';

const B = require('berries');

const createValidatorMatchersErrors: CreateValidatorMatchersErrors =
  async (params) => {
    const { entity, validatorMatchers, translate } = params;
    const matcherErrorsWithNulls: Array<MatcherError | null> =
      await B.asyncMap(validatorMatchers,
        async (matcher, index, resolveMap) => {
          const checkResult = await matcher
            .check(entity, matcher.attribute || null, matcher.params || {});
          if (!checkResult) return resolveMap(null, null);

          const matcherError: MatcherError = {
            matcher,
            checkResult,
            message: matcher.message(translate, checkResult),
            key: matcher.key,
            attribute: matcher.attribute || null,
          };
          return resolveMap(null, matcherError);
        });
    const validatorMatchersErrors = ((matcherErrorsWithNulls
      .filter(matcherErrorOrNull => matcherErrorOrNull !== null
      ): Array<any>): Array<MatcherError>);
    return { ...params, validatorMatchersErrors };
  };

module.exports = createValidatorMatchersErrors;
