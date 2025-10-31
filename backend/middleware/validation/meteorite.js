/**
 * @file The validation middleware for the Meteorite model
 * @author Samuel Batchelor
 */

import Joi from "joi";
import validator from "./base.js"

const postPutSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
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
  foundYear: Joi.number().min(-2000).max(2025).required().messages({
    "number.base": "Year of discovery should be a number",
    "number.min":
      "Year of discovery should be greater than or equal to {#limit} years",
    "number.max":
      "Year of discovery should be lesser than or equal to {#limit} years",
    "any.required": "Year of discovery is required",
  }),
  mass: Joi.number().min(0).max(70000).required().messages({
    "number.base": "Mass should be a number",
    "number.min": "Mass should be greater than or equal to {#limit} kgs",
    "number.max": "Mass should be lesser than or equal to {#limit} kgs",
    "any.required": "Mass is required",
  }),
  diameter: Joi.number().min(0.002).max(0.003).required().messages({
    "number.base": "Diameter should be a number",
    "number.min": "Diameter should be greater than or equal to {#limit} kms",
    "number.max": "Diameter should be lesser than or equal to {#limit} kms",
    "any.required": "Diameter is required",
  }),
  location: Joi.string().min(3).max(255).required().messages({
    "string.base": "Location should be a string",
    "string.empty": "Location cannot be empty",
    "string.min": "Location should have a minimum length of {#limit}",
    "string.max": "Location should have a maximum length of {#limit}",
    "any.required": "Location is required",
  }),
  planetId: Joi.string().uuid().required().messages({
    "string.base": "Planet ID should be a string",
    "string.guid": "Planet ID should be a valid UUID",
    "string.empty": "Planet ID cannot be empty",
    "any.required": "Planet ID is required",
  }),
});

const patchSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional().messages({
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
  foundYear: Joi.number().min(-2000).max(2025).optional().messages({
    "number.base": "Year of discovery should be a number",
    "number.min":
      "Year of discovery should be greater than or equal to {#limit} years",
    "number.max":
      "Year of discovery should be lesser than or equal to {#limit} years"
  }),
  mass: Joi.number().min(0).max(70000).optional().messages({
    "number.base": "Mass should be a number",
    "number.min": "Mass should be greater than or equal to {#limit} kgs",
    "number.max": "Mass should be lesser than or equal to {#limit} kgs"
  }),
  diameter: Joi.number().min(0.002).max(0.003).optional().messages({
    "number.base": "Diameter should be a number",
    "number.min": "Diameter should be greater than or equal to {#limit} kms",
    "number.max": "Diameter should be lesser than or equal to {#limit} kms"
  }),
  location: Joi.string().min(3).max(255).optional().messages({
    "string.base": "Location should be a string",
    "string.empty": "Location cannot be empty",
    "string.min": "Location should have a minimum length of {#limit}",
    "string.max": "Location should have a maximum length of {#limit}"
  }),
  planetId: Joi.string().uuid().optional().messages({
    "string.base": "Planet ID should be a string",
    "string.guid": "Planet ID should be a valid UUID",
    "string.empty": "Planet ID cannot be empty"
  }),
}).min(1);

const validatePostMeteorite = validator(postPutSchema);
const validatePutMeteorite = validator(postPutSchema);
const validatePatchMeteorite = validator(patchSchema);

export { validatePostMeteorite, validatePutMeteorite, validatePatchMeteorite };
