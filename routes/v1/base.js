/**
 * @file This file contains and exports the function necessary for creating routes
 * @author Samuel Batchelor
 */

import express from "express";
import { getLimit, cudLimit } from "../../middleware/limiting/limit.js";

/**
 * Function for creating an Express route
 * @function createRouter
 * @param {Object} controller - The controller object containing CRUD functions
 * @param {Function} authorisation - Middleware to apply authorization to routes
 * @param {Function} postValidator - Middleware to validate the POST request body
 * @param {Function} putValidator - Middleware to validate the PUT request body
 * @returns {express.Router} Return the configured router to be passed on to app.js
 */

const createRouter = (controller, postValidator, authorisation, putValidator) => {
    const router = express.Router();

    router.get("/", getLimit, controller.get);
    router.get("/:id", getLimit, controller.getById);
    router.post("/", cudLimit, postValidator, authorisation, controller.create);
    router.put("/:id", cudLimit, putValidator, authorisation, controller.update);
    router.delete("/:id", cudLimit, authorisation, controller.delete);

    return router;
};

export default createRouter;