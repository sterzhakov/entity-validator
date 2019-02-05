const createAttributesRules = require('./createAttributesRules');

const createEntityMatchers = require('./createEntityMatchers');

const createEntityMatchersErrors = require('./createEntityMatchersErrors');

const validate = params => {
  return Promise.resolve(params).then(createAttributesRules).then(createEntityMatchers).then(createEntityMatchersErrors);
};

module.exports = validate;