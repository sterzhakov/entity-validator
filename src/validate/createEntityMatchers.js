// @flow
import type { CreateEntityMatchers } from '../types';

const createEntityMatchers: CreateEntityMatchers = (params) => {
  const { attributesRules, matchers } = params;
  const entityMatchers = attributesRules
    .reduce((entityMatchers, validatorRule) => {
      const validatorMatcher = matchers
        .find((matcher) => matcher.key === validatorRule.key);
      if (!validatorMatcher) return entityMatchers;
      const validatorMatcherExtended = {
        ...validatorMatcher,
        attribute: validatorRule.attribute,
        params: {
          ...validatorMatcher.params,
          ...validatorRule.params,
        },
      };
    return [ ...entityMatchers, validatorMatcherExtended ];
  }, []);
  return { ...params, entityMatchers };
};

module.exports = createEntityMatchers;
