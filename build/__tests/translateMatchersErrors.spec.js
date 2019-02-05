const translateMatchersErrors = require('../translateMatchersErrors');

describe('translateMatchersErrors', () => {
  it('add translation to matcher errors', () => {
    const matchersErrors = [{
      key: 'presence',
      attribute: 'name',
      checkResult: {
        name: 'world'
      }
    }];

    const translate = (key, params = {}) => {
      if (typeof key !== 'string') {
        throw new Error('Key param should be a string!');
      }

      const dictionary = {
        presence: ({
          name
        }) => `Hello ${name}!`
      };
      return dictionary[key](params);
    };

    const translatedMatcherErrors = translateMatchersErrors(matchersErrors, {
      key: 'message',
      translate,
      params: {
        name: 'world'
      }
    });
    expect(translatedMatcherErrors).toEqual([{ ...matchersErrors[0],
      message: 'Hello world!'
    }]);
  });
});