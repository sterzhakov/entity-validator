// @flow
const createAttributesRules = require('../createAttributesRules');

describe('validate/createAttributesRules', () => {
  it('create attributesRules by valdiatorAttributes:string', () => {
    const attributes = [
      {
        key: 'name',
        rules: [
          'presence',
          'string'
        ],
      },
    ];

    const { attributesRules } = createAttributesRules({ attributes });

    expect(attributesRules).toEqual([
      { key: 'presence', attribute: 'name', params: {} },
      { key: 'string', attribute: 'name', params: {} },
    ]);
  });

  it('create attributesRules by validatorAttributes:object', () => {
    const attributes = [
      {
        key: 'name',
        rules: [
          { key: 'presence', params: {} },
          { key: 'string', params: {} }
        ],
      },
    ];

    const { attributesRules } = createAttributesRules({ attributes });

    expect(attributesRules).toEqual([
      { key: 'presence', attribute: 'name', params: {} },
      { key: 'string', attribute: 'name', params: {} },
    ]);
  });
});
