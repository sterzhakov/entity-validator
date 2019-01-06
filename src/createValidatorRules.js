// @flow
import type { CreateValidatorRules } from './types.flow';

const createValidatorRules: CreateValidatorRules = (params) => {
  const { validatorAttributes } = params;
  const validatorRules = validatorAttributes.reduce((newRules, attribute) => {
    const rulesWithParams = attribute.rules
      .map((rule) => (
        typeof rule === 'object'
          ? {
              key: rule.key,
              attribute: attribute.key,
              params: rule.params,
            }
          : {
              key: rule,
              attribute: attribute.key,
              params: {},
            }
      ));
    return [ ...newRules, ...rulesWithParams ];
  }, []);
  return { ...params, validatorRules };
};

module.exports = createValidatorRules;
