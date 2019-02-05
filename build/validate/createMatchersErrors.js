const B = require('berries');

const createMatchersErrors = async params => {
  const {
    entity,
    entityMatchers
  } = params;
  const matchersErrorsWithNulls = await B.asyncMap(entityMatchers, async (matcher, index, resolveMap) => {
    const checkResult = await matcher.check(entity, matcher.attribute || null, matcher.params || {});
    if (!checkResult) return resolveMap(null, null);
    const matcherError = {
      checkResult,
      key: matcher.key,
      attribute: matcher.attribute || null
    };
    return resolveMap(null, matcherError);
  });
  const matchersErrors = matchersErrorsWithNulls.filter(entityMatcherErrorOrNull => entityMatcherErrorOrNull !== null);
  return { ...params,
    matchersErrors
  };
};

module.exports = createMatchersErrors;