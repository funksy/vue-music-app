import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alphaSpaces', alphaSpaces);
    defineRule('email', email);
    defineRule('minValue', minValue);
    defineRule('maxValue', maxValue);
    defineRule('passwordsMismatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('countryExcluded', excluded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short`,
          max: `The field ${ctx.field} is too long`,
          alphaSpaces: `The field ${ctx.field} can only contain alphabetical characters and spaces`,
          email: `The field ${ctx.field} must be a valid e-mail.`,
          minValue: `The field ${ctx.field} is too low.`,
          maxValue: `The field ${ctx.field} is too high.`,
          excluded: `You are not alone to use this value for the field ${ctx.field}.`,
          countryExcluded: `Due to restrictions, we do not accept users from this location.`,
          passwordsMismatch: `The passwords do not match.`,
          tos: `You must accept the Terms of Service.`,
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
