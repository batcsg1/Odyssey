import Joi from "joi";

const meteorShowerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "name should be a string",
    "string.empty": "name cannot be empty",
    "string.min": "name should have a minimum length of {#limit}",
    "string.max": "name should have a maximum length of {#limit}",
    "any.required": "name is required"
  }),
  previousYear: Joi.number().integer().min(1000).max(9999).required().messages({
    "number.base": "previousYear should be a number",
    "number.integer": "previousYear should be an integer",
    "number.min": "previousYear should be greater than or equal to {#limit}",
    "number.max": "previousYear should be less than or equal to {#limit}",
    "any.required": "previousYear is required"
  }),
  nextYear: Joi.number().integer().min(1000).max(9999).required().messages({
    "number.base": "nextYear should be a number",
    "number.integer": "nextYear should be an integer",
    "number.min": "nextYear should be greater than or equal to {#limit}",
    "number.max": "nextYear should be less than or equal to {#limit}",
    "any.required": "nextYear is required"
  }),
  initialDate: Joi.date().required().messages({
    "date.base": "initialDate should be a valid date",
    "any.required": "initialDate is required"
  }),
  finalDate: Joi.date().greater(Joi.ref('initialDate')).required().messages({
    "date.base": "finalDate should be a valid date",
    "date.greater": "finalDate should be later than initialDate",
    "any.required": "finalDate is required"
  }),
  frequency: Joi.number().integer().min(1).max(365).required().messages({
    "number.base": "frequency should be a number",
    "number.integer": "frequency should be an integer",
    "number.min": "frequency should be greater than or equal to {#limit}",
    "number.max": "frequency should be less than or equal to {#limit}",
    "any.required": "frequency is required"
  }),
  duration: Joi.number().integer().min(1).max(24).required().messages({
    "number.base": "duration should be a number",
    "number.integer": "duration should be an integer",
    "number.min": "duration should be greater than or equal to {#limit}",
    "number.max": "duration should be less than or equal to {#limit}",
    "any.required": "duration is required"
  }),
  meteorVelocity: Joi.number().min(0).max(100).optional().messages({
    "number.base": "meteorVelocity should be a number",
    "number.min": "meteorVelocity should be greater than or equal to {#limit}",
    "number.max": "meteorVelocity should be less than or equal to {#limit}"
  }),
  meteorsPerHour: Joi.number().integer().min(1).optional().messages({
    "number.base": "meteorsPerHour should be a number",
    "number.integer": "meteorsPerHour should be an integer",
    "number.min": "meteorsPerHour should be greater than or equal to {#limit}"
  }),
  peakDate: Joi.date().optional().messages({
    "date.base": "peakDate should be a valid date"
  }),
  cometId: Joi.string().uuid().optional().messages({
    "string.base": "cometId should be a string",
    "string.guid": "cometId should be a valid UUID"
  }),
  asteroidId: Joi.string().uuid().optional().messages({
    "string.base": "asteroidId should be a string",
    "string.guid": "asteroidId should be a valid UUID"
  }),
  constellationId: Joi.string().uuid().optional().messages({
    "string.base": "constellationId should be a string",
    "string.guid": "constellationId should be a valid UUID"
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
