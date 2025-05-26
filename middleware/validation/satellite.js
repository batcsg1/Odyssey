import { Location, SatelliteType } from "@prisma/client";
import Joi from "joi";

const validatePostSatellite = (req, res, next) => {
  const postSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is required",
    }),
    age: Joi.number().min(0).max(1.6e10).required().messages({
      "number.base": "Age should be a number",
      "number.min": "Age should be greater than or equal to {#limit} years",
      "number.max": "Age should be lesser than or equal to {#limit} years",
      "any.required": "Age is required",
    }),
    mass: Joi.number().unsafe().min(1.26).max(1.5e23).required().messages({
      "number.base": "Mass should be a number",
      "number.min": "Mass should be greater than or equal to {#limit} kgs",
      "number.max": "Mass should be lesser than or equal to {#limit} kgs",
      "any.required": "Mass is required",
    }),
    diameter: Joi.number().min(0.0001).max(5500).required().messages({
      "number.base": "Diameter should be a number",
      "number.min": "Diameter should be greater than or equal to {#limit} kms",
      "number.max": "Diameter should be lesser than or equal to {#limit} kms",
      "any.required": "Diameter is required",
    }),
    density: Joi.number().min(0.2).max(15).required().messages({
      "number.base": "Density should be a number",
      "number.min": "Density should be greater than or equal to {#limit} kg/m3",
      "number.max": "Density should be lesser than or equal to {#limit} kg/m3",
      "any.required": "Density is required",
    }),
    type: Joi.string()
      .valid(...Object.values(SatelliteType))
      .required()
      .messages({
        "string.base": "Type should be a string",
        "string.empty": "Type cannot be empty",
        "any.only": `Type must be one of the following: ${Object.values(SatelliteType)}`,
        "any.required": "Type is required",
      }),
    atmosphere: Joi.boolean().required().messages({
      "boolean.base": "Atmosphere should be a boolean",
      "any.required": "An atmosphere is required",
    }),
    year: Joi.number().min(0).max(1.5e6).required().messages({
      "number.base": "Year should be a number",
      "number.min": "Year should be greater than or equal to {#limit} years",
      "number.max": "Year should be lesser than or equal to {#limit} Years",
      "any.required": "Year is required",
    }),
    perigee: Joi.number().min(300).max(4.8e7).required().messages({
      "number.base": "Perigee should be a number",
      "number.min": "Perigee should be greater than or equal to {#limit} kms",
      "number.max": "Perigee should be lesser than or equal to {#limit} kms",
      "any.required": "Perigee is required",
    }),
    apogee: Joi.number().min(300).max(4.8e7).required().messages({
      "number.base": "Apogee should be a number",
      "number.min": "Apogee should be greater than or equal to {#limit} kms",
      "number.max": "Apogee should be lesser than or equal to {#limit} kms",
      "any.required": "Apogee is required",
    }),
    tilt: Joi.number().min(0).max(360).optional().messages({
      "number.base": "Tilt should be a number",
      "number.min": "Tilt should be greater than or equal to {#limit}°",
      "number.max": "Tilt should be lesser than or equal to {#limit}°",
    }),
    minTemp: Joi.number().max(800).optional().messages({
      "number.base": "Minimum temperature should be a number",
      "number.max":
        "Minimum temperature should be lesser than or equal to {#limit}°K",
      "any.required": "Minimum temperature is required",
    }),
    maxTemp: Joi.number().max(800).optional().messages({
      "number.base": "Maximum temperature should be a number",
      "number.max":
        "Maximum temperature should be lesser than or equal to {#limit}°K",
      "any.required": "Maximum temperature is required",
    }),
    gravity: Joi.number().min(0).max(530).optional().messages({
      "number.base": "Gravity should be a number",
      "number.min": "Gravity should be greater than or equal to {#limit} m/s",
      "number.max": "Gravity should be lesser than or equal to {#limit} m/s",
    }),
    day: Joi.number().min(0).unsafe().required().messages({
      "number.base": "Day should be a number",
      "number.min": "Day should be greater than or equal to {#limit} days",
      "any.required": "Day is required",
    }),
    brightness: Joi.number().min(-32).max(32).required().messages({
      "number.base": "Brightness should be a number",
      "number.min": "Brightness should be greater than or equal to {#limit}",
      "number.max": "Brightness should be lesser than or equal to +{#limit}",
      "any.required": "Brightness is required",
    }),
    location: Joi.string()
      .valid(...Object.values(Location))
      .required()
      .messages({
        "string.base": "Location should be a string",
        "string.empty": "Location cannot be empty",
        "any.only": `Location must be one of the following: ${Object.values(Location)}`,
        "any.required": "Location is required",
      }),
    habitable: Joi.boolean().required().messages({
      "boolean.base": "The habitable field should be a boolean",
      "any.required": "The habitable field is required",
    }),
    planetId: Joi.string().uuid().required().messages({
      "string.base": "Planet ID should be a string",
      "string.guid": "Planet ID should be a valid UUID",
      "string.empty": "Planet ID cannot be empty",
      "any.required": "Planet ID is required",
    }),
  });
  const { error } = postSchema.validate(req.body, { convert: false });

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

const validatePutSatellite = (req, res, next) => {
  const putSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional().messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}"
    }),
    age: Joi.number().min(0).max(1.6e10).optional().messages({
      "number.base": "Age should be a number",
      "number.min": "Age should be greater than or equal to {#limit} years",
      "number.max": "Age should be lesser than or equal to {#limit} years"
    }),
    mass: Joi.number().unsafe().min(1.26).max(1.5e23).optional().messages({
      "number.base": "Mass should be a number",
      "number.min": "Mass should be greater than or equal to {#limit} kgs",
      "number.max": "Mass should be lesser than or equal to {#limit} kgs"
    }),
    diameter: Joi.number().min(0.0001).max(5500).optional().messages({
      "number.base": "Diameter should be a number",
      "number.min": "Diameter should be greater than or equal to {#limit} kms",
      "number.max": "Diameter should be lesser than or equal to {#limit} kms"
    }),
    density: Joi.number().min(0.2).max(15).optional().messages({
      "number.base": "Density should be a number",
      "number.min": "Density should be greater than or equal to {#limit} kg/m3",
      "number.max": "Density should be lesser than or equal to {#limit} kg/m3"
    }),
    type: Joi.string()
      .valid(...Object.values(SatelliteType))
      .optional()
      .messages({
        "string.base": "Type should be a string",
        "string.empty": "Type cannot be empty",
        "any.only": `Type must be one of the following: ${Object.values(SatelliteType)}`
      }),
    atmosphere: Joi.boolean().optional().messages({
      "boolean.base": "Atmosphere should be a boolean"
    }),
    year: Joi.number().min(0).max(1.5e6).optional().messages({
      "number.base": "Year should be a number",
      "number.min": "Year should be greater than or equal to {#limit} years",
      "number.max": "Year should be lesser than or equal to {#limit} Years"
    }),
    perigee: Joi.number().min(300).max(4.8e7).optional().messages({
      "number.base": "Perigee should be a number",
      "number.min": "Perigee should be greater than or equal to {#limit} kms",
      "number.max": "Perigee should be lesser than or equal to {#limit} kms"
    }),
    apogee: Joi.number().min(300).max(4.8e7).optional().messages({
      "number.base": "Apogee should be a number",
      "number.min": "Apogee should be greater than or equal to {#limit} kms",
      "number.max": "Apogee should be lesser than or equal to {#limit} kms"
    }),
    tilt: Joi.number().min(0).max(360).optional().messages({
      "number.base": "Tilt should be a number",
      "number.min": "Tilt should be greater than or equal to {#limit}°",
      "number.max": "Tilt should be lesser than or equal to {#limit}°",
    }),
    minTemp: Joi.number().max(800).optional().messages({
      "number.base": "Minimum temperature should be a number",
      "number.max": "Minimum temperature should be lesser than or equal to {#limit}°K"
    }),
    maxTemp: Joi.number().max(800).optional().messages({
      "number.base": "Maximum temperature should be a number",
      "number.max": "Maximum temperature should be lesser than or equal to {#limit}°K"
    }),
    gravity: Joi.number().min(0).max(530).optional().messages({
      "number.base": "Gravity should be a number",
      "number.min": "Gravity should be greater than or equal to {#limit} m/s",
      "number.max": "Gravity should be lesser than or equal to {#limit} m/s",
    }),
    day: Joi.number().min(0).unsafe().optional().messages({
      "number.base": "Day should be a number",
      "number.min": "Day should be greater than or equal to {#limit} days"
    }),
    brightness: Joi.number().min(-32).max(32).optional().messages({
      "number.base": "Brightness should be a number",
      "number.min": "Brightness should be greater than or equal to {#limit}",
      "number.max": "Brightness should be lesser than or equal to +{#limit}"
    }),
    location: Joi.string()
      .valid(...Object.values(Location))
      .optional()
      .messages({
        "string.base": "Location should be a string",
        "string.empty": "Location cannot be empty",
        "any.only": `Location must be one of the following: ${Object.values(Location)}`
      }),
    habitable: Joi.boolean().optional().messages({
      "boolean.base": "The habitable field should be a boolean"
    }),
    planetId: Joi.string().uuid().optional().messages({
      "string.base": "Planet ID should be a string",
      "string.guid": "Planet ID should be a valid UUID",
      "string.empty": "Planet ID cannot be empty"
    }),
  }).min(1);
  const { error } = putSchema.validate(req.body, { convert: false });

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

export { validatePostSatellite, validatePutSatellite };
