const validator = (schema, options = { convert: false }) => (req, res, next) => {
    const { error } = schema.validate(req.body, options);

    if (error) {
        return res.status(409).json({
            message: error.details[0].message,
        });
    }

    next();
};

export default validator;