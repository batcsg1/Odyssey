/**
 * @file The validation middleware for the Galaxy model
 * @author Samuel Batchelor
 */

import { GalaxyType } from "@prisma/client";
import Joi from "joi";

const postPutSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is required",
  }),
  type: Joi.string()
    .valid(...Object.values(GalaxyType))
    .required()
    .messages({
      "string.base": "Type should be a string",
      "string.empty": "Type cannot be empty",
      "any.only": `Type must be one of the following: ${Object.values(GalaxyType)}`,
      "any.required": "Type is required",
    }),
  distance: Joi.number().min(0).max(4.7e10).required().messages({
    "number.base": "Distance should be a number",
    "number.min":
      "Distance should be greater than or equal to {#limit} light years",
    "number.max":
      "Distance should be lesser than or equal to {#limit} light years",
    "any.required": "Distance is required",
  }),
  size: Joi.number().min(0).max(1.7e10).required().messages({
    "number.base": "Size should be a number",
    "number.min":
      "Size should be greater than or equal to {#limit} light years",
    "number.max":
      "Size should be lesser than or equal to {#limit} light years",
    "any.required": "Size is required",
  }),
  brightness: Joi.number().min(-32).max(32).required().messages({
    "number.base": "Brightness should be a number",
    "number.min": "Brightness should be greater than or equal to {#limit}",
    "number.max": "Brightness should be lesser than or equal to +{#limit}",
    "any.required": "Brightness is required",
  }),
  constellationId: Joi.string().uuid().optional().messages({
    "string.base": "Constellation ID should be a string",
    "string.empty": "Constellation ID cannot be empty",
    "string.guid": "Constellation ID should be a valid UUID",
  }),
});

const patchSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
  }),
  type: Joi.string()
    .valid(...Object.values(GalaxyType))
    .optional()
    .messages({
      "string.base": "Type should be a string",
      "string.empty": "Type cannot be empty",
      "any.only": `Type must be one of the following: ${Object.values(GalaxyType)}`,
    }),
  distance: Joi.number().min(0).max(4.7e10).optional().messages({
    "number.base": "Distance should be a number",
    "number.min":
      "Distance should be greater than or equal to {#limit} light years",
    "number.max":
      "Distance should be lesser than or equal to {#limit} light years"
  }),
  size: Joi.number().min(0).max(1.7e10).optional().messages({
    "number.base": "Size should be a number",
    "number.min":
      "Size should be greater than or equal to {#limit} light years",
    "number.max":
      "Size should be lesser than or equal to {#limit} light years"
  }),
  brightness: Joi.number().min(-32).max(32).optional().messages({
    "number.base": "Brightness should be a number",
    "number.min": "Brightness should be greater than or equal to {#limit}",
    "number.max": "Brightness should be lesser than or equal to +{#limit}"
  }),
  constellationId: Joi.string().uuid().optional().messages({
    "string.base": "Constellation ID should be a string",
    "string.empty": "Constellation ID cannot be empty",
    "string.guid": "Constellation ID should be a valid UUID",
  }),
}).min(1);

/**
 * @description This function performs POST validation when creating a galaxy
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} next - The next middleware in the stack
 * @returns {object} - The response object containing the validation message
 */
const validatePostGalaxy = (req, res, next) => {

  // Validate request body and disable type coersion
  const { error } = postPutSchema.validate(req.body, { convert: false });

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

/**
 * @description This function performs PUT validation when updating a galaxy
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} next - The next middleware in the stack
 * @returns {object} - The response object containing the validation message
 */
const validatePutGalaxy = (req, res, next) => {

  // Validate request body and disable type coersion
  const { error } = postPutSchema.validate(req.body, { convert: false });

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

/**
 * @description This function performs PATCH validation when updating a galaxy
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} next - The next middleware in the stack
 * @returns {object} - The response object containing the validation message
 */
const validatePatchGalaxy = (req, res, next) => {

  // Validate request body and disable type coersion
  const { error } = patchSchema.validate(req.body, { convert: false });

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

export { validatePostGalaxy, validatePutGalaxy, validatePatchGalaxy };
