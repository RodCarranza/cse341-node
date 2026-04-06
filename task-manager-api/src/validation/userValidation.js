const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const complexityOptions = {
  min: 6,
  max: 100,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4
};

const createUserSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Username must be a string',
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters',
      'string.max': 'Username must be less than 50 characters',
      'any.required': 'Username is required'
    }),

  password: passwordComplexity(complexityOptions, 'Password')
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
      'passwordComplexity.tooShort': 'Password must be at least 6 characters',
      'passwordComplexity.tooLong': 'Password must be less than 100 characters',
      'passwordComplexity.uppercase': 'Password must include at least one uppercase letter',
      'passwordComplexity.lowercase': 'Password must include at least one lowercase letter',
      'passwordComplexity.numeric': 'Password must include at least one number',
      'passwordComplexity.symbol': 'Password must include at least one symbol'
    })
});

const updateUserSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(50)
    .messages({
      'string.base': 'Username must be a string',
      'string.min': 'Username must be at least 3 characters',
      'string.max': 'Username must be less than 50 characters'
    }),

  password: passwordComplexity(complexityOptions, 'Password')
    .messages({
      'passwordComplexity.tooShort': 'Password must be at least 6 characters',
      'passwordComplexity.tooLong': 'Password must be less than 100 characters',
      'passwordComplexity.uppercase': 'Password must include at least one uppercase letter',
      'passwordComplexity.lowercase': 'Password must include at least one lowercase letter',
      'passwordComplexity.numeric': 'Password must include at least one number',
      'passwordComplexity.symbol': 'Password must include at least one symbol'
    })
})
  .min(1)
  .messages({
    'object.min': 'At least one field is required to update the user'
  });

module.exports = {
  createUserSchema,
  updateUserSchema
};