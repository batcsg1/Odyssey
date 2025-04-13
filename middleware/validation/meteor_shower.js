import Joi from "joi";

const meteorShowerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is required"
  }),
  previousYear: Joi.number().integer().min(1000).max(9999).required().messages({
    "number.base": "The previous year should be a number",
    "number.integer": "The previous year should be an integer",
    "number.min": "The previous year should be greater than or equal to {#limit}",
    "number.max": "The previous year should be less than or equal to {#limit}",
    "any.required": "The previous year is required"
  }),
  nextYear: Joi.number().integer().min(1000).max(9999).required().messages({
    "number.base": "The next year should be a number",
    "number.integer": "The next year should be an integer",
    "number.min": "The next year should be greater than or equal to {#limit}",
    "number.max": "The next year should be less than or equal to {#limit}",
    "any.required": "The next year is required"
  }),
  initialDate: Joi.date().required().messages({
    "date.base": "Initial date should be a valid date",
    "any.required": "Initial date is required"
  }),
  finalDate: Joi.date().required().messages({
    "date.base": "Final date should be a valid date",
    "any.required": "Final date is required"
  }),
  frequency: Joi.number().min(1).max(365).required().messages({
    "number.base": "Frequency should be a number",
    "number.integer": "Frequency should be an integer",
    "number.min": "Frequency should be greater than or equal to {#limit}",
    "number.max": "Frequency should be less than or equal to {#limit}",
    "any.required": "Frequency is required"
  }),
  duration: Joi.number().min(1).max(24).required().messages({
    "number.base": "Duration should be a number",
    "number.integer": "Duration should be an integer",
    "number.min": "Duration should be greater than or equal to {#limit}",
    "number.max": "Duration should be less than or equal to {#limit}",
    "any.required": "Duration is required"
  }),
  velocity: Joi.number().min(0).max(100).optional().messages({
    "number.base": "Meteor velocity should be a number",
    "number.min": "Meteor velocity should be greater than or equal to {#limit} km/s",
    "number.max": "Meteor velocity should be less than or equal to {#limit} km/s"
  }),
  perHour: Joi.number().min(1).optional().messages({
    "number.base": "Meteors per hour should be a number",
    "number.integer": "Meteors per hour should be an integer",
    "number.min": "Meteors per hour should be greater than or equal to {#limit}"
  }),
  peakDate: Joi.date().optional().messages({
    "date.base": "The peak date should be a valid date"
  }),
  cometId: Joi.string().uuid().optional().messages({
    "string.base": "Comet ID should be a string",
    "string.guid": "Comet ID should be a valid UUID"
  }),
  asteroidId: Joi.string().uuid().optional().messages({
    "string.base": "Asteroid ID should be a string",
    "string.guid": "Asteroid ID should be a valid UUID"
  }),
  constellationId: Joi.string().uuid().optional().messages({
    "string.base": "Constellation ID should be a string",
    "string.guid": "Constellation ID should be a valid UUID"
  }),
});

const validateSchema = (schema, isRequired = false) => {
  return (req, res, next) => {
    const { error } = isRequired
      ? schema.required().validate(req.body)
      : schema.validate(req.body);

    if (error) {
      return res.status(409).json({
        message: error.details[0].message,
      });
    }

    next();
  };
};

const validatePostMeteorShower = validateSchema(meteorShowerSchema, true);
const validatePutMeteorShower = validateSchema(meteorShowerSchema);

export { validatePostMeteorShower, validatePutMeteorShower };
