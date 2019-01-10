```javascript
const { validatorMatchersErrors } = await validate({
  entity: { name: 'Igor' },
  validator: {
    key: 'human',
    attributes: [
      {
        key: 'name',
        rules: ['presence']
      },
      {
        key: 'gender',
        rules: ['presence']
      },
      {
        key: 'email',
        rules: [
          {
            key: 'custom',
            params: {
              check: params.checkEmail
            }
          }
        ]
      }
    ]
  },
  translate: (string, params = {}) => {
    return Object.keys(params).reduce((string, paramKey) => {
      return string.replace(paramKey, params[paramKey]);
    }, string);
  },
  matchers: [presenceMatcher]
});

// validatorMatchersErrors:
```
