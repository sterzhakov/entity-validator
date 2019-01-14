Dead simple sync/async object validation library with focus on custom matchers.

## Install

```bash
npm i entity-validator
```

## How to use?

You have entity for validate

```javascript
const entity = {};
```

and attributes rules

```javascript
const attributes = [
  {
    key: 'name',
    rules: [ 'presence' ],
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
const { matchersErrors } = await validate({ entity, attributes, matchers });

// matchersErrors => [
//   {
//     key: 'presence',
//     attribute: 'name',
//     checkResult: { messageKey: 'presenseText' },
//   },
// ]
```

## Flow types support
require it from entity-valdiator/build/types.js.flow
