// @flow
import type { CreateValidatorMatchers } from './types.flow';

const createValidatorMatchers: CreateValidatorMatchers = (params) => {
  const { validatorRules, matchers } = params;
  const validatorMatchers = validatorRules
    .reduce((validatorMatchers, validatorRule) => {
      const validatorMatcher = matchers
        .find((matcher) => matcher.key === validatorRule.key);
      if (!validatorMatcher) return validatorMatchers;
      const validatorMatcherExtended = {
        ...validatorMatcher,
        attribute: validatorRule.attribute,
        params: {
          ...validatorMatcher.params,
          ...validatorRule.params,
        },
      };
      return [ ...validatorMatchers, validatorMatcherExtended ];
    }, []);
  return { ...params, validatorMatchers };
};

module.exports = createValidatorMatchers;
