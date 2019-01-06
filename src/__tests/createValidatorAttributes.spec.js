// @flow
const createValidatorAttributes = require('../createValidatorAttributes');

describe('core/context/createValidate/createValidatorAttributes', () => {
  it('create attributes from validator', () => {
    const validator = {
      key: 'human',
      createAttributes: (params) => ([
        {
          ...params,
          key: 'name',
          rules: [],
        },
        {
          ...params,
          key: 'name',
          rules: [],
        }
      ])
    };

    const validatorParams = { example: 'example' };

    const { validatorAttributes } = createValidatorAttributes({
      validators: [validator],
      validatorKey: 'human',
      validatorParams,
    });

    expect(validatorAttributes).toEqual(
      validator.createAttributes(validatorParams)
    );
  });
});
