import Joi from "joi";

const planetSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is required"
  }),
  age: Joi.number().min(0).max(1.6e10).required().messages({
    "number.base": "Age should be a number",
    "number.min": "Age should be greater than or equal to {#limit} years",
    "number.max": "Age should be lesser than or equal to {#limit} years",
    "any.required": "Age is required"
  }),
  mass: Joi.number().unsafe().min(9.35e20).max(1.89e28).required().messages({
    "number.base": "Mass should be a number",
    "number.min": "Mass should be greater than or equal to {#limit} kgs",
    "number.max": "Mass should be lesser than or equal to {#limit} kgs",
    "any.required": "Mass is required"
  }),
  diameter: Joi.number().min(400).max(280000).required().messages({
    "number.base": "Diameter should be a number",
    "number.min": "Diameter should be greater than or equal to {#limit} kms",
    "number.max": "Diameter should be lesser than or equal to {#limit} kms",
    "any.required": "Diameter is required"
  }),
  density: Joi.number().min(2).max(15).required().messages({
    "number.base": "Density should be a number",
    "number.min": "Density should be greater than or equal to {#limit} kg/m3",
    "number.max": "Density should be lesser than or equal to {#limit} kg/m3",
    "any.required": "Density is required"
  }),
  type: Joi.string().min(3).max(100).required().messages({
    "string.base": "Type should be a string",
    "string.empty": "Type cannot be empty",
    "string.min": "Type should have a minimum length of {#limit}",
    "string.max": "Type should have a maximum length of {#limit}",
    "any.required": "Type is required"
  }),
  atmosphere: Joi.boolean().required().messages({
    "boolean.base": "Atmosphere should be a boolean",
    "any.required": "An atmosphere is required"
  }),
  year: Joi.number().min(0).max(1.5e6).required().messages({
    "number.base": "Year should be a number",
    "number.min": "Year should be greater than or equal to {#limit} years",
    "number.max": "Year should be lesser than or equal to {#limit} Years",
    "any.required": "Year is required"
  }),
  perigee: Joi.number().unsafe().min(3.5e6).required().messages({
    "number.base": "Perigee should be a number",
    "number.min": "Perigee should be greater than or equal to {#limit} kms",
    "any.required": "Perigee is required"
  }),
  apogee: Joi.number().unsafe().min(3.5e6).required().messages({
    "number.base": "Apogee should be a number",
    "number.min": "Apogee should be greater than or equal to {#limit} kms",
    "any.required": "Apogee is required"
  }),
  tilt: Joi.number().min(0).max(360).optional().messages({
    "number.base": "Tilt should be a number",
    "number.min": "Tilt should be greater than or equal to {#limit}°",
    "number.max": "Tilt should be lesser than or equal to {#limit}°"
  }),
  hasSatellites: Joi.boolean().required().messages({
    "boolean.base": "The 'hasSatellites' field should be a boolean",
    "any.required": "The 'hasSatellites' field is required"
  }),
  minTemp: Joi.number().unsafe().max(4.4e23).optional().messages({
    "number.base": "Minimum temperature should be a number",
    "number.max": "Minimum temperature should be lesser than or equal to {#limit}°C",
    "any.required": "Minimum temperature is required"
  }),
  maxTemp: Joi.number().unsafe().max(4.4e23).optional().messages({
    "number.base": "Maximum temperature should be a number",
    "number.max": "Maximum temperature should be lesser than or equal to {#limit}°C",
    "any.required": "Maximum temperature is required"
  }),
  gravity: Joi.number().min(0).max(530).optional().messages({
    "number.base": "Gravity should be a number",
    "number.min": "Gravity should be greater than or equal to {#limit} m/s",
    "number.max": "Gravity should be lesser than or equal to {#limit} m/s"
  }),
  day: Joi.number().min(0).unsafe().required().messages({
    "number.base": "Day should be a number",
    "number.min": "Day should be greater than or equal to {#limit} days",
    "any.required": "Day is required"
  }),
  location: Joi.string().min(3).max(255).required().messages({
    "string.base": "Location should be a string",
    "string.empty": "Location cannot be empty",
    "string.min": "Location should have a minimum length of {#limit}",
    "string.max": "Location should have a maximum length of {#limit}",
    "any.required": "Location is required"
  }),
  habitable: Joi.boolean().required().messages({
    "boolean.base": "The habitable field should be a boolean",
    "any.required": "The habitable field is required"
  }),
  starId: Joi.string().uuid().required().messages({
    "string.base": "Star ID should be a string",
    "string.guid": "Star ID should be a valid UUID",
    "any.required": "Star ID is required"
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
