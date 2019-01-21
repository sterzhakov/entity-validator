// @flow
import type { Validate } from '../types';

const createAttributesRules = require('./createAttributesRules');
const createEntityMatchers = require('./createEntityMatchers');
const createMatchersErrors = require('./createMatchersErrors');

const validate: Validate = (params) => {
  return Promise.resolve(params)
    .then(createAttributesRules)
    .then(createEntityMatchers)
    .then(createMatchersErrors);
};

module.exports = validate;
