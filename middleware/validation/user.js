import Joi from "joi";

const userSchema = Joi.object({
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
    email: Joi.string()
        .pattern(/^[A-Za-z0-9._%+-]+@[a-z]+\.com$/)
        .required()
        .messages({
            "string.pattern.base": "Email must be a valid email address",
            "any.required": "Email is required"
        }),
    homePlanet: Joi.string().uuid().optional().messages({
        "string.base": "Home planet ID should be a string",
        "string.empty": "Home planet ID cannot be empty",
        "string.guid": "Home planet ID should be a valid UUID"
    })
});

const validateSchema = (schema, isRequired = false) => {
    return (req, res, next) => {
        const { error } = isRequired
            ? schema.required().validate(req.body, { convert: false })
            : schema.validate(req.body, { convert: false });

        if (error) {
            return res.status(409).json({
                message: error.details[0].message,
            });
        }

        next();
    };
};

const validatePostUser = validateSchema(userSchema, true);
const validatePutUser = validateSchema(userSchema);

export { validatePostUser, validatePutUser };
