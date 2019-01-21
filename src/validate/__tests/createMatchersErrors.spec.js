// @flow
const createMatchersErrors =
  require('../createMatchersErrors');

describe('validate/createMatchersErrors', () => {
  it('create matchersErrors by entityMatchers, entity and translate',
  async () => {
    const entityMatchers = [
      {
        key: 'presence',
        params: {},
        attribute: 'name',
        check: (entity, attribute) => {
          if (!attribute) return null;
          return {};
        },
      },
    ];

    const { matchersErrors } =
      await createMatchersErrors({
        entity: { name: 'Igor Sterzhakov' },
        translate: (key) => { return key; },
        entityMatchers,
      });

    expect(matchersErrors).toEqual([
      {
        key: 'presence',
        attribute: 'name',
        checkResult: {},
      },
    ]);
  });
});
