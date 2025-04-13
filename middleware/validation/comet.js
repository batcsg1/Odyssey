import Joi from "joi";

// Define the comet schema
const cometSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is required"
  }),
  mass: Joi.number().min(1).max(10e14).required().messages({
    "number.base": "Mass should be a number",
    "number.min": "Mass should be greater than or equal to {#limit} kgs",
    "number.max": "Mass should be lesser than or equal to {#limit} kgs",
    "any.required": "Mass is required"
  }),
  diameter: Joi.number().min(0.1).max(150).required().messages({
    "number.base": "Diameter should be a number",
    "number.min": "Diameter should be greater than or equal to {#limit} kms",
    "number.max": "Diameter should be lesser than or equal to {#limit} kms",
    "any.required": "Diameter is required"
  }),
  density: Joi.number().min(0.1).max(0.5).required().messages({
    "number.base": "Density should be a number",
    "number.min": "Density should be greater than or equal to {#limit} kg/m3",
    "number.max": "Density should be lesser than or equal to {#limit} kg/m3",
    "any.required": "Density is required"
  }),
  type: Joi.string().min(3).max(50).required().messages({
    "string.base": "Type should be a string",
    "string.empty": "Type cannot be empty",
    "string.min": "Type should have a minimum length of {#limit}",
    "string.max": "Type should have a maximum length of {#limit}",
    "any.required": "Type is required"
  }),
  year: Joi.number().min(0).max(10000).required().messages({
    "number.base": "Year should be a number",
    "number.min": "Year should be greater than or equal to {#limit} years",
    "number.max": "Year should be lesser than or equal to {#limit} Years",
    "any.required": "Year is required"
  }),
  perigee: Joi.number().min(3.5e6).max(3.5e9).required().messages({
    "number.base": "Perigee should be a number",
    "number.min": "Perigee should be greater than or equal to {#limit} kms",
    "number.max": "Perigee should be lesser than or equal to {#limit} kms",
    "any.required": "Perigee is required"
  }),
  apogee: Joi.number().min(3.5e6).max(3.5e9).required().messages({
    "number.base": "Apogee should be a number",
    "number.min": "Apogee should be greater than or equal to {#limit} kms",
    "number.max": "Apogee should be lesser than or equal to {#limit} kms",
    "any.required": "Apogee is required"
  }),
  brightness: Joi.number().min(-32).max(32).required().messages({
    "number.base": "Brightness should be a number",
    "number.min": "Brightness should be greater than or equal to {#limit}",
    "number.max": "Brightness should be lesser than or equal to +{#limit}",
    "any.required": "Brightness is required"
  }),
  location: Joi.string().min(3).max(255).required().messages({
    "string.base": "Location should be a string",
    "string.empty": "Location cannot be empty",
    "string.min": "Location should have a minimum length of {#limit}",
    "string.max": "Location should have a maximum length of {#limit}",
    "any.required": "Location is required"
  }),
  starId: Joi.string().uuid().required().messages({
    "string.base": "Star ID should be a string",
    "string.guid": "Star ID should be a valid UUID",
    "any.required": "Star ID is required"
  })
});

// Validation function to apply the schema to request body
const validateSchema = (schema, isRequired = false) => {
  return (req, res, next) => {
    const { error } = isRequired
      ? schema.required().validate(req.body)
      : schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    next();
  };
};

// Validations for POST and PUT requests
const validatePostComet = validateSchema(cometSchema, true);
const validatePutComet = validateSchema(cometSchema);

export { validatePostComet, validatePutComet };
