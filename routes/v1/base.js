/**
 * @file This file contains and exports the function necessary for creating routes
 * @author Samuel Batchelor
 */

import express from "express";
import { getLimit, cudLimit } from "../../middleware/limiting/limit.js";

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