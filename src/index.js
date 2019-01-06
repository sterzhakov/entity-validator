// @flow
const recursiveReaddirSync = require('recursive-readdir-sync');
const translateErrors = require('../../translators/translateErrors');
// const createValidator = require('./createValidator');
const validate = require('./validate');
const getLocale = require('../../utils/getLocale');
const path = require('path');
const B = require('berries');

// export type ValidatorTemplate = {
//   key: string,
//   createMatchers: ({[string]: mixed}) => Array<Matcher>
// };
//
// export type Validator = {
//   key: string,
//   matchers: Array<Matcher>,
// }

import type { Config } from '../../../app/config.flow';
import type { Translate } from '../../../app/config.flow';
import type {
  Validate,
  Entity,
} from './types.flow';

const createValidate = async (params) => {
  const { config: Config, translate: Translate } = params;
  // Matchers

  const matcherPaths = recursiveReaddirSync(
    path.join(process.cwd(), 'app/matchers')
  );

  const matchers: ValidatorMatchers = matcherPaths
    .reduce((matchers, matcherPath) => {
      if (matcherPath.match(/(S|s)pec\.js/)) return matchers;
      const matcher: ValidatorMatchers = require(matcherPath);
      return { ...matchers, ...matcher };
    }, {});


  // Validators

  const validatorPaths = recursiveReaddirSync(
    path.join(process.cwd(), 'app/validators')
  );

  const validators: Validators = validatorPaths.reduce((validators, validatorPath) => {
    if (validatorPath.match(/\/common\//)) return validators;
    const validator = require(validatorPath);
    return { ...validators, ...validator };
  }, {});


  // Validate errors

  const curriedValidate = (
    validatorKey: string,
    entity: Entity,
    validatorParams: { [string]: mixed },
  ) => {
    return validate({
      entity,
      matchers,
      validatorKey,
      validatorParams: { ...validatorParams, config },
      validators,
    });
  };


  const validate: Validate = async (validatorKey, object = {}, params = {}) => {
    // type here
    const errors = await curriedValidate(validatorKey, object, params);

    const defaultPath = {
      attributes: 'validation.attributes',
      messages:   'validation.messages',
    }

    const translatedErrors = translateErrors({
      errors,
      locale: getLocale({
        locale: object.locale,
        locales: config.locales,
        defaultLocale: config.defaultLocale,
      }),
      translate,
      path: config.errors.translationPath || defaultPath
    });

    return translatedErrors.map(error => {
      return {
        attribute: error.attribute,
        ...B.omit(error.matcher, 'check', 'args'),
      };
    });
  };

  return { ...params, validate };
};

module.exports = createValidate;
