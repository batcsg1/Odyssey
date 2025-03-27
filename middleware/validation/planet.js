import Joi from "joi";

const planetSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "name should be a string",
    "string.empty": "name cannot be empty",
    "string.min": "name should have a minimum length of {#limit}",
    "string.max": "name should have a maximum length of {#limit}",
    "any.required": "name is required"
  }),
  age: Joi.number().min(0).max(1.6e10).required().messages({
    "number.base": "age should be a number",
    "number.min": "age should be greater than or equal to {#limit}",
    "any.required": "age is required"
  }),
  mass: Joi.number().unsafe().min(9.35e20).max(1.89e28).required().messages({
    "number.base": "mass should be a number",
    "number.min": "diameter should be greater than or equal to {#limit}",
    "number.max": "mass should be lesser than or equal to {#limit}",
    "any.required": "mass is required"
  }),
  diameter: Joi.number().min(400).max(280000).required().messages({
    "number.base": "diameter should be a number",
    "number.min": "diameter should be greater than or equal to {#limit}",
    "number.max": "diameter should be lesser than or equal to {#limit}",
    "any.required": "diameter is required"
  }),
  density: Joi.number().min(2).max(15).required().messages({
    "number.base": "density should be a number",
    "number.min": "density should be greater than or equal to {#limit}",
    "number.max": "density should be lesser than or equal to {#limit}",
    "any.required": "density is required"
  }),
  type: Joi.string().min(3).max(100).required().messages({
    "string.base": "type should be a string",
    "string.empty": "type cannot be empty",
    "string.min": "type should have a minimum length of {#limit}",
    "string.max": "type should have a maximum length of {#limit}",
    "any.required": "type is required"
  }),
  atmosphere: Joi.boolean().required().messages({
    "boolean.base": "atmosphere should be a boolean",
    "any.required": "An atmosphere is required"
  }),
  year: Joi.number().min(0).max(1.5e6).required().messages({
    "number.base": "year should be a number",
    "number.min": "year should be greater than or equal to {#limit}",
    "any.required": "year is required"
  }),
  perigee: Joi.number().unsafe().min(3.5e6).required().messages({
    "number.base": "perigee should be a number",
    "number.min": "perigee should be greater than or equal to {#limit}",
    "any.required": "perigee is required"
  }),
  apogee: Joi.number().unsafe().min(3.5e6).required().messages({
    "number.base": "apogee should be a number",
    "number.min": "apogee should be greater than or equal to {#limit}",
    "any.required": "apogee is required"
  }),
  tilt: Joi.number().min(0).max(360).optional().messages({
    "number.base": "tilt should be a number",
    "number.min": "tilt should be greater than or equal to {#limit}",
    "number.max": "tilt should be lesser than or equal to {#limit}"
  }),
  hasSatellites: Joi.boolean().required().messages({
    "boolean.base": "hasSatellites should be a boolean",
    "any.required": "hasSatellites is required"
  }),
  minTemp: Joi.number().unsafe().max(4.4e23).optional().messages({
    "number.base": "minTemp should be a number",
    "number.max": "temperature should be lesser than or equal to {#limit} °C",
    "any.required": "minTemp is required"
  }),
  maxTemp: Joi.number().unsafe().max(4.4e23).optional().messages({
    "number.base": "maxTemp should be a number",
    "number.max": "temperature should be lesser than or equal to {#limit} °C",
    "any.required": "maxTemp is required"
  }),
  gravity: Joi.number().min(0).max(530).optional().messages({
    "number.base": "gravity should be a number",
    "number.min": "gravity should be greater than or equal to {#limit} m/s",
    "number.max": "gravity should be lesser than or equal to {#limit} m/s",
    "any.required": "gravity is required"
  }),
  day: Joi.number().min(0).unsafe().required().messages({
    "number.base": "day should be a number",
    "number.min": "day should be greater than or equal to {#limit}",
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
        message: error.details[0].message,
      });
    }

    next();
  };
};

const validatePostPlanet = validateSchema(planetSchema, true);
const validatePutPlanet = validateSchema(planetSchema);

export { validatePostPlanet, validatePutPlanet };
