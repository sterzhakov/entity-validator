// @flow

const isString = (item): %checks => {
  return typeof item === 'string';
};

const isObject = (item): %checks => {
  return typeof item === 'object' && !Array.isArray(item);
};

module.exports = { isString, isObject };
