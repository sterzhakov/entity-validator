const createAttributesRules = require('./createAttributesRules');

const createEntityMatchers = require('./createEntityMatchers');

const createMatchersErrors = require('./createMatchersErrors');

const validate = params => {
  return Promise.resolve(params).then(createAttributesRules).then(createEntityMatchers).then(createMatchersErrors);
};

module.exports = validate;