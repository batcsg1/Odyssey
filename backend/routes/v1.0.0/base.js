/**
 * @file This file contains and exports the function necessary for creating routes
 * @author Samuel Batchelor
 */

import express from "express";
import options from "../../middleware/options/general.js";

/**
 * Function for creating an Express route
 * @function createRouter
 * @param {Object} controller - The controller object containing CRUD functions
 * @param {Function} rbac - Middleware to apply role based access to routes
 * @param {Function} postValidator - Middleware to validate the POST request body
 * @param {Function} putValidator - Middleware to validate the PUT request body
 * @param {Function} patchValidator - Middleware to validate the PATCH request body
 * @returns {express.Router} Return the configured router to be passed on to app.js
 */

const createRouter = (controller, getLimit, headLimit, cudLimit, optionsLimit, postValidator, rbac, putValidator, patchValidator, auth = null) => {
    const router = express.Router();
    
    router.head("/", headLimit(), controller.head);
    router.head("/:id", headLimit(), controller.headById);
    router.get("/", getLimit(), controller.get);
    router.get("/:id", getLimit(), controller.getById);
    router.options("/", optionsLimit(), options);  

    if (auth){
    router.post("/", auth, cudLimit(), postValidator, rbac, controller.create);
    router.put("/:id", auth, cudLimit(), putValidator, rbac, controller.update);
    router.patch("/:id", auth, cudLimit(), patchValidator, rbac, controller.update);
    router.delete("/:id", auth, cudLimit(), rbac, controller.delete);
    } else {
    router.post("/", cudLimit(), postValidator, rbac, controller.create);
    router.put("/:id", cudLimit(), putValidator, rbac, controller.update);
    router.patch("/:id", cudLimit(), patchValidator, rbac, controller.update);
    router.delete("/:id", cudLimit(), rbac, controller.delete); 
    }

    return router;
};

export default createRouter;