/**
 * @file This file contains and exports the function necessary for creating the user route
 * @author Samuel Batchelor
 */

import express from "express";
import userOptions from "../../middleware/options/user.js";

/**
 * Function for creating an Express route
 * @function createUserRouter
 * @param {Object} controller - The controller object containing CRUD functions
 * @param {Function} postValidator - Middleware to validate the POST request body
 * @param {Function} putValidator - Middleware to validate the PUT request body
 * @returns {express.Router} Return the configured router to be passed on to app.js
 */

const createUserRouter = (controller, getLimit, cudLimit, optionsLimit, postValidator, putValidator, patchValidator) => {
    const router = express.Router();

    router.get("/", getLimit(), controller.get);
    router.get("/:id", getLimit(), controller.getById);
    router.post("/", cudLimit(), postValidator, controller.create);
    router.put("/:id", cudLimit(), putValidator, controller.update);
    router.patch("/:id", cudLimit(), patchValidator, controller.update);
    router.delete("/:id", cudLimit(), controller.delete);
    router.options("/", optionsLimit(), userOptions);
    router.head("/", controller.head);
    router.head("/:id", controller.headById);

    return router;
};

export default createUserRouter;