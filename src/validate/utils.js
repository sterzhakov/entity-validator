// @flow

const isString = (item: any): %checks => {
  return typeof item === 'string';
};

const isObject = (item: any): %checks => {
  return typeof item === 'object' && !Array.isArray(item);
};

module.exports = { isString, isObject };
