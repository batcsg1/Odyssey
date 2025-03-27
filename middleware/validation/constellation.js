import Joi from "joi";

const constellationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is required"
  }),
  right_ascension: Joi.number().required().messages({
    "number.base": "right_ascension should be a number",
    "any.required": "right_ascension is required"
  }),
  declination: Joi.number().required().messages({
    "number.base": "declination should be a number",
    "any.required": "declination is required"
  }),
  shape: Joi.string().min(3).max(100).required().messages({
    "string.base": "shape should be a string",
    "string.empty": "shape cannot be empty",
    "string.min": "shape should have a minimum length of {#limit}",
    "string.max": "shape should have a maximum length of {#limit}",
    "any.required": "shape is required"
  }),
  area: Joi.number().min(0).required().messages({
    "number.base": "area should be a number",
    "number.min": "area should be greater than or equal to {#limit}",
    "any.required": "area is required"
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

const validatePostConstellation = validateSchema(constellationSchema, true);
const validatePutConstellation = validateSchema(constellationSchema);

export { validatePostConstellation, validatePutConstellation };
