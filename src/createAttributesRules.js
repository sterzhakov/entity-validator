// @flow
import type { CreateRules } from './types';

const { isString, isObject } = require('./utils');

const createAttributesRules: CreateRules = (params) => {
  const { attributes } = params;
  const attributesRules = attributes
    .reduce((newRules, attribute) => {
      const rulesWithParams = attribute.rules
        .map((rule) => {
          if (isObject(rule)) {
            return {
              key: rule.key,
              attribute: attribute.key,
              params: rule.params,
            };
          } else if (isString(rule)) {
            return {
              key: rule,
              attribute: attribute.key,
              params: {},
            };
          } else {
            const ruleTypeof = typeof rule;
            const ruleType = ruleTypeof === 'object' ? 'array' : ruleTypeof;
            throw new Error(`Unknown type for rule: ${ruleType}`);
          }
        });
      return [ ...newRules, ...rulesWithParams ];
    }, []);
  return { ...params, attributesRules };
};

module.exports = createAttributesRules;
