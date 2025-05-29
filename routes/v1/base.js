/**
 * @file This file contains and exports the function necessary for creating routes
 * @author Samuel Batchelor
 */

import express from "express";

const createRouter = (controller, postValidator, authorisation, putValidator) => {
    const router = express.Router();

    router.get("/", controller.get);
    router.get("/:id", controller.getById);
    router.post("/", postValidator, authorisation, controller.create);
    router.put("/:id", putValidator, authorisation, controller.update);
    router.delete("/:id", authorisation, controller.delete);

    return router;
};

export default createRouter;