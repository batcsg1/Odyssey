import Joi from "joi";

const starSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "name should be a string",
    "string.empty": "name cannot be empty",
    "string.min": "name should have a minimum length of {#limit}",
    "string.max": "name should have a maximum length of {#limit}",
    "any.required": "name is required"
  }),
  age: Joi.number().min(0).max(16000000000).required().messages({
    "number.base": "age should be a number",
    "number.min": "age should be greater than or equal to {#limit}",
    "number.max": "age should be lesser than or equal to {#limit}",
    "any.required": "age is required"
  }),
  mass: Joi.number().min(0).unsafe().required().messages({
    "number.base": "mass should be a number",
    "number.min": "age should be greater than or equal to {#limit}",
    "any.required": "mass is required"
  }),
  diameter: Joi.number().min(0).max(1300000000).required().messages({
    "number.base": "diameter should be a number",
    "number.min": "diameter should be greater than or equal to {#limit}",
    "number.max": "diameter should be lesser than or equal to {#limit}",
    "any.required": "diameter is required"
  }),
  type: Joi.string().min(3).max(50).required().messages({
    "string.base": "type should be a string",
    "string.empty": "type cannot be empty",
    "string.min": "type should have a minimum length of {#limit}",
    "string.max": "type should have a maximum length of {#limit}",
    "any.required": "type is required"
  }),
  distance: Joi.number().min(0).unsafe().required().messages({
    "number.base": "distance should be a number",
    "number.min": "distance should be greater than or equal to {#limit}",
    "any.required": "distance is required"
  }),
  temperature: Joi.number().unsafe().required().messages({
    "number.base": "temperature should be a number",
    "any.required": "temperature is required"
  }),
  luminosity: Joi.number().unsafe().required().messages({
    "number.base": "luminosity should be a number",
    "any.required": "luminosity is required"
  }),
  hasPlanets: Joi.boolean().required().messages({
    "boolean.base": "hasPlanets should be a boolean",
    "any.required": "hasPlanets is required"
  }),
  brightness: Joi.number().required().messages({
    "number.base": "brightness should be a number",
    "any.required": "brightness is required"
  }),
  rightAscension: Joi.number().optional().messages({
    "number.base": "rightAscension should be a number"
  }),
  declination: Joi.number().optional().messages({
    "number.base": "declination should be a number"
  }),
  constellationId: Joi.string().uuid().optional().messages({
    "string.base": "constellationId should be a string",
    "string.guid": "constellationId should be a valid UUID",
    "string.empty": "constellationId cannot be empty"
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

const validatePostStar = validateSchema(starSchema, true);
const validatePutStar = validateSchema(starSchema);

export { validatePostStar, validatePutStar };
