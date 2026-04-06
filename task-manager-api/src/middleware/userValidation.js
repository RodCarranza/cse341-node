const {
  createUserSchema,
  updateUserSchema
} = require('../validation/userValidation');

const validateCreateUser = (req, res, next) => {
  const { error } = createUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map((detail) => detail.message)
    });
  }

  next();
};

const validateUpdateUser = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map((detail) => detail.message)
    });
  }

  next();
};

module.exports = {
  validateCreateUser,
  validateUpdateUser
};