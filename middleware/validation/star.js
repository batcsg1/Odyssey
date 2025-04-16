import { StarType } from "@prisma/client";
import Joi from "joi";

const starSchema = Joi.object({
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
  mass: Joi.number().min(0).max(230).required().messages({
    "number.base": "Mass should be a number",
    "number.min": "Mass should be greater than or equal to {#limit} M☉",
    "number.max": "Mass should be lesser than or equal to {#limit} M☉",
    "any.required": "Mass is required"
  }),
  diameter: Joi.number().min(0).max(1.3e9).required().messages({
    "number.base": "Diameter should be a number",
    "number.min": "Diameter should be greater than or equal to {#limit} kms",
    "number.max": "Diameter should be lesser than or equal to {#limit} kms",
    "any.required": "Diameter is required"
  }),
  type: Joi.string().valid(...Object.values(StarType)).required().messages({
    "string.base": "Type should be a string",
    "string.empty": "Type cannot be empty",
    "any.only": `Type must be one of the following: ${Object.values(StarType)}`,
    "any.required": "Type is required"
  }),
  distance: Joi.number().min(0).max(4.7e10).required().messages({
    "number.base": "Distance should be a number",
    "number.min": "Distance should be greater than or equal to {#limit} light years",
    "number.max": "Distance should be lesser than or equal to {#limit} light years",
    "any.required": "Distance is required"
  }),
  temperature: Joi.number().unsafe().max(4.4e23).required().messages({
    "number.base": "Temperature should be a number",
    "number.max": "Temperature should be lesser than or equal to {#limit} °C",
    "any.required": "Temperature is required"
  }),
  luminosity: Joi.number().min(0).max(5e6).required().messages({
    "number.base": "Luminosity should be a number",
    "number.min": "Luminosity should be greater than or equal to {#limit} L☉",
    "number.max": "Luminosity should be lesser than or equal to {#limit} L☉",
    "any.required": "Luminosity is required"
  }),
  hasPlanets: Joi.boolean().required().messages({
    "boolean.base": "the 'hasPlanet' field should be a boolean",
    "any.required": "the 'hasPlanet' field is required"
  }),
  brightness: Joi.number().min(-32).max(32).required().messages({
    "number.base": "Brightness should be a number",
    "number.min": "Brightness should be greater than or equal to {#limit}",
    "number.max": "Brightness should be lesser than or equal to +{#limit}",
    "any.required": "Brightness is required"
  }),
  galaxyId: Joi.string().uuid().required().messages({
    "string.base": "Galaxy ID should be a string",
    "string.guid": "Galaxy ID should be a valid UUID",
    "string.empty": "Galaxy ID cannot be empty",
    "any.required": "Galaxy ID is required"
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
