import Joi from "joi";

const validatePostConstellation = (req, res, next) => {
  const postSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is required",
    }),
    shape: Joi.string().min(3).max(100).optional().messages({
      "string.base": "Shape should be a string",
      "string.empty": "Shape cannot be empty",
      "string.min": "Shape should have a minimum length of {#limit}",
      "string.max": "Shape should have a maximum length of {#limit}",
    }),
    area: Joi.number().strict().min(0).max(41253.0).optional().messages({
      "number.base": "Area should be a number",
      "number.min": "Area should be greater than or equal to {#limit}",
      "number.max": "Area should be lesser than or equal to {#limit}",
    }),
    abbreviation: Joi.string().min(3).max(3).required().messages({
      "string.base": "Abbreviation should be a string",
      "string.empty": "Abbreviation cannot be empty",
      "string.min": "Abbreviation should have a minimum length of {#limit}",
      "string.max": "Abbreviation should have a maximum length of {#limit}",
      "any.required": "Abbreviation is required",
    }),
  });

  const { error } = postSchema.validate(req.body);

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

const validatePutConstellation = (req, res, next) => {
  const putSchema = Joi.object({
    name: Joi.string().min(3).max(100).optional().messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is required",
    }),
    shape: Joi.string().min(3).max(100).optional().messages({
      "string.base": "Shape should be a string",
      "string.empty": "Shape cannot be empty",
      "string.min": "Shape should have a minimum length of {#limit}",
      "string.max": "Shape should have a maximum length of {#limit}",
    }),
    area: Joi.number().strict().min(0).max(41253.0).optional().messages({
      "number.base": "Area should be a number",
      "number.min": "Area should be greater than or equal to {#limit}",
      "number.max": "Area should be lesser than or equal to {#limit}",
    }),
    abbreviation: Joi.string().min(3).max(3).optional().messages({
      "string.base": "Abbreviation should be a string",
      "string.empty": "Abbreviation cannot be empty",
      "string.min": "Abbreviation should have a minimum length of {#limit}",
      "string.max": "Abbreviation should have a maximum length of {#limit}",
      "any.required": "Abbreviation is required",
    }),
  }).min(1);

  const { error } = putSchema.validate(req.body);

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

export { validatePostConstellation, validatePutConstellation };
