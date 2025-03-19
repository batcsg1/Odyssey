import Joi from "joi";

const planetSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "name should be a string",
    "string.empty": "name cannot be empty",
    "string.min": "name should have a minimum length of {#limit}",
    "string.max": "name should have a maximum length of {#limit}",
    "any.required": "name is required"
  }),
  age: Joi.number().min(0).required().messages({
    "number.base": "age should be a number",
    "number.min": "age should be greater than or equal to {#limit}",
    "any.required": "age is required"
  }),
  mass: Joi.number().min(0).unsafe().required().messages({
    "number.base": "mass should be a number",
    "any.required": "mass is required"
  }),
  diameter: Joi.number().min(0).required().messages({
    "number.base": "diameter should be a number",
    "number.min": "diameter should be greater than or equal to {#limit}",
    "any.required": "diameter is required"
  }),
  density: Joi.number().min(0).required().messages({
    "number.base": "density should be a number",
    "number.min": "density should be greater than or equal to {#limit}",
    "any.required": "density is required"
  }),
  type: Joi.string().min(3).max(100).required().messages({
    "string.base": "type should be a string",
    "string.empty": "type cannot be empty",
    "string.min": "type should have a minimum length of {#limit}",
    "string.max": "type should have a maximum length of {#limit}",
    "any.required": "type is required"
  }),
  atmosphere: Joi.string().min(3).max(255).required().messages({
    "string.base": "atmosphere should be a string",
    "string.empty": "atmosphere cannot be empty",
    "string.min": "atmosphere should have a minimum length of {#limit}",
    "string.max": "atmosphere should have a maximum length of {#limit}",
    "any.required": "atmosphere is required"
  }),
  year: Joi.number().min(0).required().messages({
    "number.base": "year should be a number",
    "number.min": "year should be greater than or equal to {#limit}",
    "any.required": "year is required"
  }),
  perigee: Joi.number().min(0).required().messages({
    "number.base": "perigee should be a number",
    "number.min": "perigee should be greater than or equal to {#limit}",
    "any.required": "perigee is required"
  }),
  apogee: Joi.number().min(0).required().messages({
    "number.base": "apogee should be a number",
    "number.min": "apogee should be greater than or equal to {#limit}",
    "any.required": "apogee is required"
  }),
  tilt: Joi.number().optional().messages({
    "number.base": "tilt should be a number"
  }),
  hasSatellites: Joi.boolean().required().messages({
    "boolean.base": "hasSatellites should be a boolean",
    "any.required": "hasSatellites is required"
  }),
  minTemp: Joi.number().optional().messages({
    "number.base": "minTemp should be a number",
    "any.required": "minTemp is required"
  }),
  maxTemp: Joi.number().optional().messages({
    "number.base": "maxTemp should be a number",
    "any.required": "maxTemp is required"
  }),
  gravity: Joi.number().optional().messages({
    "number.base": "gravity should be a number",
    "any.required": "gravity is required"
  }),
  day: Joi.number().required().messages({
    "number.base": "day should be a number",
    "any.required": "day is required"
  }),
  location: Joi.string().min(3).max(255).required().messages({
    "string.base": "location should be a string",
    "string.empty": "location cannot be empty",
    "string.min": "location should have a minimum length of {#limit}",
    "string.max": "location should have a maximum length of {#limit}",
    "any.required": "location is required"
  }),
  habitable: Joi.boolean().required().messages({
    "boolean.base": "habitable should be a boolean",
    "any.required": "habitable is required"
  }),
  starId: Joi.string().uuid().required().messages({
    "string.base": "starId should be a string",
    "string.guid": "starId should be a valid UUID",
    "any.required": "starId is required"
  }),
});

const validateSchema = (schema, isRequired = false) => {
  return (req, res, next) => {
    const { error } = isRequired
      ? schema.required().validate(req.body)
      : schema.validate(req.body);

    if (error) {
      return res.status(409).json({
        msg: error.details[0].message,
      });
    }

    next();
  };
};

const validatePostPlanet = validateSchema(planetSchema, true);
const validatePutPlanet = validateSchema(planetSchema);

export { validatePostPlanet, validatePutPlanet };
