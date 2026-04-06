const { taskSchema } = require('../validation/taskValidation');

const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map((detail) => detail.message)
    });
  }

  next();
};

module.exports = validateTask;