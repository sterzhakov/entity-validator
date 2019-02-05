const createAttributesRules = params => {
  const {
    attributes
  } = params;
  const attributesRules = attributes.reduce((newRules, attribute) => {
    const rulesWithParams = attribute.rules.map(rule => typeof rule === 'object' ? {
      key: rule.key,
      attribute: attribute.key,
      params: rule.params
    } : {
      key: rule,
      attribute: attribute.key,
      params: {}
    });
    return [...newRules, ...rulesWithParams];
  }, []);
  return { ...params,
    attributesRules
  };
};

module.exports = createAttributesRules;