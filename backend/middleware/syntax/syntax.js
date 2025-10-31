/**
 * @description Custom error-handling middleware to handle JSON syntax errors
 * @author Samuel Batchelor
 */

const syntax = (err, req, res, next) => {
    // Catch invalid JSON syntax errors
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            message: "Invalid request body, please check your syntax"
        });
    }
};

export default syntax;