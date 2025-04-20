import { GalaxyType } from "@prisma/client";
import Joi from "joi";

const galaxySchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        "string.base": "Name should be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name should have a minimum length of {#limit}",
        "string.max": "Name should have a maximum length of {#limit}",
        "any.required": "Name is required"
    }),
    type: Joi.string().valid(...Object.values(GalaxyType)).required().messages({
        "string.base": "Type should be a string",
        "string.empty": "Type cannot be empty",
        "any.only": `Type must be one of the following: ${Object.values(GalaxyType)}`,
        "any.required": "Type is required"
    }),
    distance: Joi.number().min(0).max(4.7e10).required().messages({
        "number.base": "Distance should be a number",
        "number.min": "Distance should be greater than or equal to {#limit} light years",
        "number.max": "Distance should be lesser than or equal to {#limit} light years",
        "any.required": "Distance is required"
    }),
    size: Joi.number().min(0).max(1.7e10).required().messages({
        "number.base": "Size should be a number",
        "number.min": "Size should be greater than or equal to {#limit} light years",
        "number.max": "Size should be lesser than or equal to {#limit} light years",
        "any.required": "Size is required"
    }),
    brightness: Joi.number().min(-32).max(32).required().messages({
        "number.base": "Brightness should be a number",
        "number.min": "Brightness should be greater than or equal to {#limit}",
        "number.max": "Brightness should be lesser than or equal to +{#limit}",
        "any.required": "Brightness is required"
    }),
    constellationId: Joi.string().uuid().optional().messages({
        "string.base": "Constellation ID should be a string",
        "string.empty": "Constellation ID cannot be empty",
        "string.guid": "Constellation ID should be a valid UUID"
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

const validatePostGalaxy = validateSchema(galaxySchema, true);
const validatePutGalaxy = validateSchema(galaxySchema);

export { validatePostGalaxy, validatePutGalaxy };
