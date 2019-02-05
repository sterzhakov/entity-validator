const createEntityMatchersErrors = require('../createEntityMatchersErrors');

describe('core/context/createValidate/createEntityMatchersErrors', () => {
  it('create matcherErrors by entityMatchers, entity and translate', async () => {
    const entityMatchers = [{
      key: 'presence',
      params: {},
      attribute: 'name',
      check: (entity, attribute) => {
        if (!attribute) return null;
        return {};
      },
      message: (translate, params) => translate('example', params)
    }];
    const {
      validatorMatchersErrors
    } = await createEntityMatchersErrors({
      entity: {
        name: 'Igor Sterzhakov'
      },
      translate: key => {
        return key;
      },
      entityMatchers
    });
    expect(validatorMatchersErrors).toEqual([{
      key: 'presence',
      attribute: 'name',
      checkResult: {},
      matcher: entityMatchers[0],
      message: 'example'
    }]);
  });
});