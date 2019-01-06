// @flow
import type { Validate } from './types.flow';

const createValidatorAttributes = require('./createValidatorAttributes');
const createValidatorRules = require('./createValidatorRules');
const createValidatorMatchers = require('./createValidatorMatchers');
const createValidatorMatchersErrors = require('./createValidatorMatchersErrors');

const validate: Validate = (params) => {
  return Promise.resolve(params)
    .then(createValidatorAttributes)
    .then(createValidatorRules)
    .then(createValidatorMatchers)
    .then(createValidatorMatchersErrors);
};

module.exports = validate;
