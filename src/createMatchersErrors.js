// @flow
import type { CreateMatchersErrors, MatcherError } from './types';

const B = require('berries');

const createMatchersErrors: CreateMatchersErrors =
  async (params) => {
    const { entity, entityMatchers } = params;
    const matchersErrorsWithNulls: Array<MatcherError | null> =
      await B.asyncMap(entityMatchers,
        async (matcher, index, resolveMap) => {
          const checkResult = await matcher
            .check(entity, matcher.attribute || null, matcher.params || {});
          if (!checkResult) return resolveMap(null, null);

          const matcherError: MatcherError = {
            checkResult,
            key: matcher.key,
            attribute: matcher.attribute || null,
          };
          return resolveMap(null, matcherError);
        });
    const matchersErrors = ((matchersErrorsWithNulls
      .filter(entityMatcherErrorOrNull => entityMatcherErrorOrNull !== null
      ): Array<any>): Array<MatcherError>);
    return { ...params, matchersErrors };
  };

module.exports = createMatchersErrors;
