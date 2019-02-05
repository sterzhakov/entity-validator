Dead simple sync/async object validation library with focus on custom matchers.

# Install

```bash
npm i entity-validator
```

# How to use?

## validate(params)
params.entity: Entity
params.matchers: Array<Matcher>,
params.attributes: Array<Attribute>,


You have entity for validate

```javascript
const entity = {};
```

and attributes rules

```javascript
const attributes = [
  {
    key: 'name',
    rules: [ 'presence' ], // or [ { key: 'presence', params: {} } ]
  },
];
```

and matchers which used in rules

```javascript
const presenceMatcher = {
  key: 'presence',
  check: (entity, attribute) => {
    if (!attribute || !entity || entity[attribute]) return null;
    return { messageKey: 'presenseText' };
  },
};

const matchers = [ presenceMatcher ];
```

now you can get validation matchers errors!

```javascript
const { validate } = require('entity-validator');
const { matchersErrors } = await validate({ entity, attributes, matchers });

// > matchersErrors
// [
//   {
//     key: 'presence',
//     attribute: 'name',
//     checkResult: { messageKey: 'presenseText' },
//   },
// ]
```

## Helpers

#### createAttributesByValidator(validator, params)
Tranform validator object (groupped attributes) to attributes.
```javascript
  const { createAttributesByValidator } = require('entity-valdiator');

  const validator = {
    key: 'user',
    attributes: ({ passwordMinLength, passwordMaxLength }) => ([
      {
        key: 'email',
        rules: [
          'presence',
          ['length', { min: passwordMinLength, max: passwordMaxLength }],
        ]
      },
    ])
  };

  const params = { passwordMinLength: 6, passwordMaxLength: 12 };
  const attributes = createAttributesByValidator(validator, params);

  // attributes => [
  //   {
  //     key: 'email',
  //     rules: [
  //       'presence',
  //       ['length', { min: 6, max: 12 }],
  //     ]
  //   },
  // ]);
```


#### translateMatcherErrors
Create key for each matcher error with result of translate function
```javascript
  const { createAttributesByValidator } = require('entity-valdiator');

  const matchersErrors = [
    {
      key: 'presence',
      attribute: 'name',
      checkResult: { name: 'world' },
    },
  ];

  const translate = (key, params = {}) => {
    const dictionary = {
      hello: ({ name }) => `Hello ${name}!`,
    };
    return dictionary[key](params);
  };

  const translatedMatcherErrors =
    translateMatchersErrors(matchersErrors, { key: 'message', translate });

  // translatedMatcherErrors => [
  //   {
  //     ...matchersErrors[0],
  //     message: 'Hello world!',
  //   },
  // ]
```

## Flow types
```javascript
  import type { Validator, /* ... */ } = from('entity-valdiator/build/types');
```
