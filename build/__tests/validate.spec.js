const validate = require('../validate');

describe('core/context/createValidate/validate', () => {
  it('create matcherErrors by translate, entity, matchers, ' + 'validators, validatorKey, validatorParams', async () => {
    const presenceMatcher = {
      key: 'presence',
      check: (entity, attribute) => {
        if (!attribute || !entity) return null;
        if (entity[attribute]) return null;
        return {
          $variable: 'text'
        };
      },
      message: (translate, params) => {
        return translate('Example $variable', params);
      }
    };
    const customMatcher = {
      key: 'custom',
      check: (entity, attribute, params) => {
        if (!attribute || !entity) return null;
        const hasError = params.check(entity, attribute, params);
        if (!hasError) return null;
        return {
          $variable: 'text'
        };
      },
      message: (translate, params) => {
        return translate('Example $variable', params);
      }
    };

    const checkEmail = (entity, attribute) => {
      const value = entity[attribute];
      if (!value) return null;
      return value.match('@') ? null : {};
    };

    const {
      validatorMatchersErrors
    } = await validate({
      entity: {
        name: 'Igor',
        email: 'sterjakov!icloud.com'
      },
      attributes: [{
        key: 'name',
        rules: ['presence']
      }, {
        key: 'gender',
        rules: ['presence']
      }, {
        key: 'email',
        rules: [{
          key: 'custom',
          params: {
            check: checkEmail
          }
        }]
      }],
      translate: (string, params = {}) => {
        return Object.keys(params).reduce((string, paramKey) => {
          return string.replace(paramKey, params[paramKey]);
        }, string);
      },
      matchers: [presenceMatcher, customMatcher]
    });
    expect(validatorMatchersErrors).toEqual([{
      matcher: { ...presenceMatcher,
        attribute: 'gender',
        params: {}
      },
      checkResult: {
        $variable: 'text'
      },
      message: 'Example text',
      key: 'presence',
      attribute: 'gender'
    }, {
      matcher: { ...customMatcher,
        attribute: 'email',
        params: {
          check: checkEmail
        }
      },
      checkResult: {
        $variable: 'text'
      },
      message: 'Example text',
      key: 'custom',
      attribute: 'email'
    }]);
  });
});