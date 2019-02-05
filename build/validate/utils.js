const isString = item => {
  return typeof item === 'string';
};

const isObject = item => {
  return typeof item === 'object' && !Array.isArray(item);
};

module.exports = {
  isString,
  isObject
};