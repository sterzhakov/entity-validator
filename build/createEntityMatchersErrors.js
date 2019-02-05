const B = require('berries');

const createEntityMatchersErrors = async params => {
  const {
    entity,
    entityMatchers,
    translate
  } = params;
  const entityMatcherErrorsWithNulls = await B.asyncMap(entityMatchers, async (matcher, index, resolveMap) => {
    const checkResult = await matcher.check(entity, matcher.attribute || null, matcher.params || {});
    if (!checkResult) return resolveMap(null, null);
    const matcherError = {
      matcher,
      checkResult,
      message: matcher.message(translate, checkResult),
      key: matcher.key,
      attribute: matcher.attribute || null
    };
    return resolveMap(null, matcherError);
  });
  const validatorMatchersErrors = entityMatcherErrorsWithNulls.filter(entityMatcherErrorOrNull => entityMatcherErrorOrNull !== null);
  return { ...params,
    validatorMatchersErrors
  };
};

module.exports = createEntityMatchersErrors;