// @flow
import type { CreateValidatorAttributes } from './types.flow';

const createValidatorAttributes: CreateValidatorAttributes = (params) => {
  const { validators, validatorKey, validatorParams } = params;
  const foundValidator = validators
    .find((validator) => validator.key === validatorKey);
  if (!foundValidator) throw new Error(`Validator ${validatorKey} doesn't exists.`);
  const validatorAttributes = foundValidator.createAttributes(validatorParams);
  return { ...params, validatorAttributes  };
};

module.exports = createValidatorAttributes;
