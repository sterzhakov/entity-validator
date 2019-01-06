// @flow
const createValidatorMatchers = require('../createValidatorMatchers');

describe('core/context/createValidate/createValidatorMatchers', () => {
  it('create validatorMatchers by validatorRules and matchers', () => {
    const validatorRules = [
      { key: 'string', attribute: 'name', params: { a: 'a' } },
      { key: 'presence', attribute: 'name', params: { a: 'a' } },
    ];

    const matchers = [
      {
        key: 'presence',
        params: { b: 'b' },
        message: () => '',
        check: () => null,
      },
    ];

    const { validatorMatchers } =
      createValidatorMatchers({ validatorRules, matchers });

    expect(validatorMatchers).toEqual([{
        ...matchers[0],
        attribute: 'name',
        params: { a: 'a', b: 'b' },
    }]);
  });
});
