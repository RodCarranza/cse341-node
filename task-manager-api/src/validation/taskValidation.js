const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().allow('').max(500),
  status: Joi.string().valid('pending', 'in progress', 'completed').required(),
  priority: Joi.string().valid('low', 'medium', 'high').required(),
  dueDate: Joi.date().iso().required().messages({
    'date.format': '"dueDate" must follow YYYY-MM-DD format'
  }),
  //userId: Joi.string().length(24).hex().required()
});

module.exports = {
  taskSchema
};