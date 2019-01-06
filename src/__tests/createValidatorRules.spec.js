// @flow
const createValidatorRules = require('../createValidatorRules');

describe('core/context/createValidate/createValidatorRules', () => {
  it('create validatorRules by valdiatorAttributes:string', () => {
    const validatorAttributes = [
      {
        key: 'name',
        rules: [
          'presence',
          'string'
        ],
      },
    ];

    const { validatorRules } = createValidatorRules({ validatorAttributes });

    expect(validatorRules).toEqual([
      { key: 'presence', attribute: 'name', params: {} },
      { key: 'string', attribute: 'name', params: {} },
    ]);
  });

  it('create validatorRules by validatorAttributes:object', () => {
    const validatorAttributes = [
      {
        key: 'name',
        rules: [
          { key: 'presence', params: {} },
          { key: 'string', params: {} }
        ],
      },
    ];

    const { validatorRules } = createValidatorRules({ validatorAttributes });

    expect(validatorRules).toEqual([
      { key: 'presence', attribute: 'name', params: {} },
      { key: 'string', attribute: 'name', params: {} },
    ]);
  });
});
