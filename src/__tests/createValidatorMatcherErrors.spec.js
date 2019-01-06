// @flow
const createValidatorMatchersErrors =
  require('../createValidatorMatchersErrors');

describe('core/context/createValidate/createValidatorMatchersErrors', () => {
  it('create matcherErrors by validatorMatchers, entity and translate',
  async () => {
    const validatorMatchers = [
      {
        key: 'presence',
        params: {},
        attribute: 'name',
        check: (entity, attribute) => {
          if (!attribute) return null;
          return {};
        },
        message: (translate, params) => translate('example', params),
      },
    ];

    const { validatorMatchersErrors } =
      await createValidatorMatchersErrors({
        entity: { name: 'Igor Sterzhakov' },
        translate: (key) => { return key; },
        validatorMatchers,
      });

    expect(validatorMatchersErrors).toEqual([
      {
        key: 'presence',
        attribute: 'name',
        checkResult: {},
        matcher: validatorMatchers[0],
        message: 'example',
      },
    ]);
  });
});
