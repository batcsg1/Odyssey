import Joi from "joi";

const meteoriteSchema = Joi.object({
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
  mass: Joi.number().min(0).max(54000).required().messages({
    "number.base": "mass should be a number",
    "number.min": "mass should be greater than or equal to {#limit}",
    "number.max": "mass should be lesser than or equal to {#limit}",
    "any.required": "mass is required"
  }),
  diameter: Joi.number().min(0.002).max(0.003).required().messages({
    "number.base": "diameter should be a number",
    "number.min": "diameter should be greater than or equal to {#limit}",
    "number.max": "diameter should be lesser than or equal to {#limit}",
    "any.required": "diameter is required"
  }),
  location: Joi.string().min(3).max(255).required().messages({
    "string.base": "location should be a string",
    "string.empty": "location cannot be empty",
    "string.min": "location should have a minimum length of {#limit}",
    "string.max": "location should have a maximum length of {#limit}",
    "any.required": "location is required"
  }),
  latitude: Joi.number().min(-90).max(90).optional().messages({
    "number.base": "latitude should be a number",
    "number.min": "latitude should be between -90 and 90",
    "number.max": "latitude should be between -90 and 90"
  }),
  longitude: Joi.number().min(-180).max(180).optional().messages({
    "number.base": "longitude should be a number",
    "number.min": "longitude should be between -180 and 180",
    "number.max": "longitude should be between -180 and 180"
  }),
  planetId: Joi.string().uuid().required().messages({
    "string.base": "planetId should be a string",
    "string.guid": "planetId should be a valid UUID",
    "any.required": "planetId is required"
  })
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

const validatePostMeteorite = validateSchema(meteoriteSchema, true);
const validatePutMeteorite = validateSchema(meteoriteSchema);

export { validatePostMeteorite, validatePutMeteorite };
