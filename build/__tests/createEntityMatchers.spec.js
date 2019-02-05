const createEntityMatchers = require('../createEntityMatchers');

describe('core/context/createValidate/createEntityMatchers', () => {
  it('create entityMatchers by attributesRules and matchers', () => {
    const attributesRules = [{
      key: 'string',
      attribute: 'name',
      params: {
        a: 'a'
      }
    }, {
      key: 'presence',
      attribute: 'name',
      params: {
        a: 'a'
      }
    }];
    const matchers = [{
      key: 'presence',
      params: {
        b: 'b'
      },
      message: () => '',
      check: () => null
    }];
    const {
      entityMatchers
    } = createEntityMatchers({
      attributesRules,
      matchers
    });
    expect(entityMatchers).toEqual([{ ...matchers[0],
      attribute: 'name',
      params: {
        a: 'a',
        b: 'b'
      }
    }]);
  });
});