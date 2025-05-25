import { Role } from "@prisma/client";
import Joi from "joi";

const validatePostUser = (req, res, next) => {
    const postSchema = Joi.object({
        firstName: Joi.string().required().messages({
            "string.base": "First name should be a string",
            "string.empty": "First name cannot be empty",
            "any.required": "First name is required"
        }),
        lastName: Joi.string().required().messages({
            "string.base": "Last name should be a string",
            "string.empty": "Last name cannot be empty",
            "any.required": "Last name is required"
        }),
        emailAddress: Joi.string()
            .pattern(/^[A-Za-z0-9._%+-]+@[a-z]+\.com$/)
            .required()
            .messages({
                "string.pattern.base": "Email must be a valid email address",
                "any.required": "Email is required"
            }),
        password: Joi.string().required().messages({
            "string.base": "Password should be a string",
            "string.empty": "Password cannot be empty",
            "any.required": "Password is required"
        }),
        role: Joi.string().valid(...Object.values(Role)).required().messages({
            "string.base": "Role should be a string",
            "string.empty": "Role cannot be empty",
            "any.only": `Role must be one of the following: ${Object.values(Role)}`,
            "any.required": "Role is required"
        }),
        homePlanet: Joi.string().uuid().optional().messages({
            "string.base": "Home planet ID should be a string",
            "string.empty": "Home planet ID cannot be empty",
            "string.guid": "Home planet ID should be a valid UUID"
        })
    });

    const { error } = postSchema.validate(req.body);

    if (error) {
        return res.status(409).json({
            message: error.details[0].message,
        });
    }

    next();
}

const validatePutUser = (req, res, next) => {
    const putSchema = Joi.object({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        emailAddress: Joi.string()
            .pattern(/^[A-Za-z0-9._%+-]+@[a-z]+\.com$/)
            .optional()
            .messages({
                "string.pattern.base": "Email must be a valid email address",
            }),
        role: Joi.string().valid(...Object.values(Role)).optional().messages({
            "any.only": `Role must be one of the following: ${Object.values(Role)}`,
        }),
        homePlanet: Joi.string().uuid().optional()
    }).min(1);

    const { error } = putSchema.validate(req.body);

    if (error) {
        return res.status(409).json({
            message: error.details[0].message,
        });
    }

    next();
}

export { validatePostUser, validatePutUser };
