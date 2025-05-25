/**
 * @file This file contains and exports the function necessary for creating the user route
 * @author Samuel Batchelor
 */

import express from "express";

const createUserRouter = (controller, postValidator, putValidator) => {
    const router = express.Router();

    router.get("/", controller.get);
    router.get("/:id", controller.getById);
    router.post("/", postValidator, controller.create);
    router.put("/:id", putValidator, controller.update);
    router.delete("/:id", controller.delete);

    return router;
};

export default createUserRouter;