/**
 * @file The validation middleware for the Meteor Shower model
 * @author Samuel Batchelor
 */

import Joi from "joi";

/**
 * @description This function performs POST validation when creating a meteor shower
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} next - The next middleware in the stack
 * @returns {object} - The response object containing the validation message
 */
const validatePostMeteorShower = (req, res, next) => {
  const postSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}",
      "any.required": "Name is required",
    }),
    previousYear: Joi.number()
      .integer()
      .min(1000)
      .max(9999)
      .required()
      .strict()
      .messages({
        "number.base": "The previous year should be a number",
        "number.integer": "The previous year should be an integer",
        "number.min":
          "The previous year should be greater than or equal to {#limit}",
        "number.max":
          "The previous year should be less than or equal to {#limit}",
        "any.required": "The previous year is required",
      }),
    nextYear: Joi.number().integer().min(1000).max(9999).required().strict().messages({
      "number.base": "The next year should be a number",
      "number.integer": "The next year should be an integer",
      "number.min": "The next year should be greater than or equal to {#limit}",
      "number.max": "The next year should be less than or equal to {#limit}",
      "any.required": "The next year is required",
    }),
    initialDate: Joi.date().required().messages({
      "date.base": "Initial date must be a valid date",
      "any.required": "Initial date is required",
    }),
    finalDate: Joi.date().required().messages({
      "date.base": "Final date should be a valid date",
      "any.required": "Final date is required",
    }),
    frequency: Joi.number().min(1).max(365).required().strict().messages({
      "number.base": "Frequency should be a number",
      "number.integer": "Frequency should be an integer",
      "number.min": "Frequency should be greater than or equal to {#limit}",
      "number.max": "Frequency should be less than or equal to {#limit}",
      "any.required": "Frequency is required",
    }),
    duration: Joi.number().min(1).max(24).required().strict().messages({
      "number.base": "Duration should be a number",
      "number.integer": "Duration should be an integer",
      "number.min": "Duration should be greater than or equal to {#limit}",
      "number.max": "Duration should be less than or equal to {#limit}",
      "any.required": "Duration is required",
    }),
    velocity: Joi.number().min(0).max(100).optional().strict().messages({
      "number.base": "Meteor velocity should be a number",
      "number.min":
        "Meteor velocity should be greater than or equal to {#limit} km/s",
      "number.max":
        "Meteor velocity should be less than or equal to {#limit} km/s",
    }),
    perHour: Joi.number().min(1).optional().strict().messages({
      "number.base": "Meteors per hour should be a number",
      "number.integer": "Meteors per hour should be an integer",
      "number.min":
        "Meteors per hour should be greater than or equal to {#limit}",
    }),
    peakDate: Joi.date().optional().messages({
      "date.base": "The peak date should be a valid date",
    }),
    comets: Joi.array()
      .items(
        Joi.string().uuid().messages({
          "string.base": "Each Comet ID should be a string",
          "string.guid": "Each Comet ID should be a valid UUID",
        })
      )
      .optional()
      .messages({
        "array.base": "Comets should be an array of valid UUIDs",
      }),
    asteroids: Joi.array()
      .items(
        Joi.string().uuid().messages({
          "string.base": "Each Asteroid ID should be a string",
          "string.guid": "Each Asteroid ID should be a valid UUID",
        })
      )
      .optional()
      .messages({
        "array.base": "Asteroids should be an array of valid UUIDs",
      }),
    constellationId: Joi.string().uuid().required().messages({
      "string.base": "Constellation ID should be a string",
      "string.guid": "Constellation ID should be a valid UUID",
      "string.empty": "Constellation ID cannot be empty",
      "any.required": "Constellation ID is required",
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

/**
 * @description This function performs PUT validation when updating a meteor shower
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} next - The next middleware in the stack
 * @returns {object} - The response object containing the validation message
 */
const validatePutMeteorShower = (req, res, next) => {
  const putSchema = Joi.object({
    name: Joi.string().min(3).max(100).optional().messages({
      "string.base": "Name should be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name should have a minimum length of {#limit}",
      "string.max": "Name should have a maximum length of {#limit}"
    }),
    previousYear: Joi.number()
      .integer()
      .min(1000)
      .max(9999)
      .optional()
      .messages({
        "number.base": "The previous year should be a number",
        "number.integer": "The previous year should be an integer",
        "number.min":
          "The previous year should be greater than or equal to {#limit}",
        "number.max":
          "The previous year should be less than or equal to {#limit}"
      }),
    nextYear: Joi.number().integer().min(1000).max(9999).optional().messages({
      "number.base": "The next year should be a number",
      "number.integer": "The next year should be an integer",
      "number.min": "The next year should be greater than or equal to {#limit}",
      "number.max": "The next year should be less than or equal to {#limit}"
    }),
    initialDate: Joi.date().optional().messages({
      "date.base": "Initial date must be a valid date"
    }),
    finalDate: Joi.date().iso().optional().messages({
      "date.base": "Final date should be a valid date"
    }),
    frequency: Joi.number().min(1).max(365).optional().messages({
      "number.base": "Frequency should be a number",
      "number.integer": "Frequency should be an integer",
      "number.min": "Frequency should be greater than or equal to {#limit}",
      "number.max": "Frequency should be less than or equal to {#limit}"
    }),
    duration: Joi.number().min(1).max(24).optional().messages({
      "number.base": "Duration should be a number",
      "number.integer": "Duration should be an integer",
      "number.min": "Duration should be greater than or equal to {#limit}",
      "number.max": "Duration should be less than or equal to {#limit}"
    }),
    velocity: Joi.number().min(0).max(100).optional().messages({
      "number.base": "Meteor velocity should be a number",
      "number.min":
        "Meteor velocity should be greater than or equal to {#limit} km/s",
      "number.max":
        "Meteor velocity should be less than or equal to {#limit} km/s",
    }),
    perHour: Joi.number().min(1).optional().messages({
      "number.base": "Meteors per hour should be a number",
      "number.integer": "Meteors per hour should be an integer",
      "number.min":
        "Meteors per hour should be greater than or equal to {#limit}",
    }),
    peakDate: Joi.date().iso().optional().messages({
      "date.base": "The peak date should be a valid date",
    }),
    comets: Joi.array()
      .items(
        Joi.string().uuid().messages({
          "string.base": "Each Comet ID should be a string",
          "string.guid": "Each Comet ID should be a valid UUID",
        })
      )
      .optional()
      .messages({
        "array.base": "Comets should be an array of valid UUIDs",
      }),
    asteroids: Joi.array()
      .items(
        Joi.string().uuid().messages({
          "string.base": "Each Asteroid ID should be a string",
          "string.guid": "Each Asteroid ID should be a valid UUID",
        })
      )
      .optional()
      .messages({
        "array.base": "Asteroids should be an array of valid UUIDs",
      }),
    constellationId: Joi.string().uuid().optional().messages({
      "string.base": "Constellation ID should be a string",
      "string.guid": "Constellation ID should be a valid UUID",
      "string.empty": "Constellation ID cannot be empty"
    }),
  }).min(1);

  // Validate request body and disable type coersion
  const { error } = putSchema.validate(req.body);

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

export { validatePostMeteorShower, validatePutMeteorShower };
