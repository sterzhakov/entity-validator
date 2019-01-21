// @flow
import type { CreateAttributesByValidator } from './types';

const createAttributesByValidator: CreateAttributesByValidator =
  (validator, params) => {
    const templateAttributes = validator.attributes(params);
    const attributes = templateAttributes.map((templateAttribute) => {
      const rules = templateAttribute.rules.map((templateAttributeRule) => {
        if (Array.isArray(templateAttributeRule)) {
          return {
            key: templateAttributeRule[0],
            params: templateAttributeRule[1],
          };
        } else if (typeof templateAttributeRule === 'string') {
          return {
            key: templateAttributeRule,
            params: {},
          };
        } else {
          const attributeType = typeof templateAttributeRule;
          throw new Error(
            `Unsupported type ${attributeType} for template attribute rule ` +
            `${templateAttributeRule.key}.`
          );
        }
      });
      return { key: templateAttribute.key, rules };
    });
    return attributes;
  };

module.exports = createAttributesByValidator;
