const createMatchersErrors = require('../createMatchersErrors');

describe('validate/createMatchersErrors', () => {
  it('create matchersErrors by entityMatchers, entity', async () => {
    const entityMatchers = [{
      key: 'presence',
      params: {
        id: 'example'
      },
      attribute: 'name',
      check: (entity, attribute, params) => {
        if (!attribute) return null;
        return params;
      }
    }];
    const {
      matchersErrors
    } = await createMatchersErrors({
      entity: {
        name: 'Igor Sterzhakov'
      },
      entityMatchers
    });
    expect(matchersErrors).toEqual([{
      key: 'presence',
      attribute: 'name',
      checkResult: {
        id: 'example'
      }
    }]);
  });
});