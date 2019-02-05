const createAttributesByValidator = require('../createAttributesByValidator');

describe('createAttributesByValidator', () => {
  it('create array of attributes', () => {
    const validator = {
      key: 'user',
      attributes: ({
        passwordMinLength,
        passwordMaxLength
      }) => [{
        key: 'email',
        rules: ['presence', ['length', {
          min: passwordMinLength,
          max: passwordMaxLength
        }]]
      }, {
        key: 'password',
        rules: ['presence']
      }]
    };
    const attributes = createAttributesByValidator(validator, {
      passwordMinLength: 6,
      passwordMaxLength: 12
    });
    expect(attributes).toEqual([{
      key: 'email',
      rules: [{
        key: 'presence',
        params: {}
      }, {
        key: 'length',
        params: {
          min: 6,
          max: 12
        }
      }]
    }, {
      key: 'password',
      rules: [{
        key: 'presence',
        params: {}
      }]
    }]);
  });
});