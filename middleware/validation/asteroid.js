import Joi from "joi";

const asteroidSchema = Joi.object({
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
    "any.required": "age is required"
  }),
  mass: Joi.number().min(1600000000000).max(120000000000000000000).required().messages({
    "number.base": "mass should be a number",
    "number.min": "mass should be greater than or equal to {#limit}",
    "number.max": "mass should be lesser than or equal to {#limit}",
    "any.required": "mass is required"
  }),
  diameter: Joi.number().min(0.0001).max(1000).required().messages({
    "number.base": "diameter should be a number",
    "number.min": "diameter should be greater than or equal to {#limit}",
    "number.max": "diameter should be lesser than or equal to {#limit}",
    "any.required": "diameter is required"
  }),
  density: Joi.number().min(0.1).max(4).unsafe().required().messages({
    "number.base": "density should be a number",
    "number.min": "density should be greater than or equal to {#limit}",
    "number.max": "density should be lesser than or equal to {#limit}",
    "any.required": "density is required"
  }),
  type: Joi.string().min(3).max(100).required().messages({
    "string.base": "type should be a string",
    "string.empty": "type cannot be empty",
    "string.min": "type should have a minimum length of {#limit}",
    "string.max": "type should have a maximum length of {#limit}"
  }),
  year: Joi.number().min(0).max(1500000).optional().messages({
    "number.base": "year should be a number",
    "number.min": "year should be greater than or equal to {#limit}",
  }),
  perigee: Joi.number().min(350).max(2000000).unsafe().optional().messages({
    "number.base": "perigee should be a number",
    "number.min": "perigee should be greater than or equal to {#limit}",
    "number.max": "perigee should be lesser than or equal to {#limit}",
  }),
  apogee: Joi.number().min(350).max(2000000).optional().messages({
    "number.base": "apogee should be a number",
    "number.min": "apogee should be greater than or equal to {#limit}",
    "number.max": "apogee should be lesser than or equal to {#limit}",
  }),
  location: Joi.string().min(3).max(255).required().messages({
    "string.base": "location should be a string",
    "string.empty": "location cannot be empty",
    "string.min": "location should have a minimum length of {#limit}",
    "string.max": "location should have a maximum length of {#limit}",
    "any.required": "location is required"
  }),
  starId: Joi.string().uuid().required().messages({
    "string.base": "starId should be a string",
    "string.guid": "starId should be a valid UUID",
    "any.required": "starId is required"
  })
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

const validatePostAsteroid = validateSchema(asteroidSchema, true);
const validatePutAsteroid = validateSchema(asteroidSchema);

export { validatePostAsteroid, validatePutAsteroid };
