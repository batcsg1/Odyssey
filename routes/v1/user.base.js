/**
 * @file This file contains and exports the function necessary for creating the user route
 * @author Samuel Batchelor
 */

import express from "express";
import { getLimit, cudLimit } from "../../middleware/limiting/limit.js";

const createUserRouter = (controller, postValidator, putValidator) => {
    const router = express.Router();

    router.get("/", getLimit, controller.get);
    router.get("/:id", getLimit, controller.getById);
    router.post("/", cudLimit, postValidator, controller.create);
    router.put("/:id", cudLimit, putValidator, controller.update);
    router.delete("/:id", cudLimit, controller.delete);

    return router;
};

export default createUserRouter;