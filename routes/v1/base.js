/**
 * @file This file contains and exports the function necessary for creating routes
 * @author Samuel Batchelor
 */

import express from "express";
import rateLimit from "express-rate-limit";
const GET_WINDOW = 60 * 2000;
const CUD_WINDOW = 60 * 1000;
const MAX_GET = 20;
const MAX_CUD = 20;

const createRouter = (controller, postValidator, authorisation, putValidator) => {
    const router = express.Router();

    const getLimit = rateLimit({
        windowMs: GET_WINDOW, // 2 minutes
        max: MAX_GET,
        message: `You have exceeded the number of requests: ${MAX_GET}. Please try again in ${(GET_WINDOW / 60000)} minutes.`
    });

    const cudLimit = rateLimit({
        windowMs: CUD_WINDOW, // 1 minute
        max: MAX_CUD,
        message: `You have exceeded the number of requests: ${MAX_CUD}. Please try again in ${(MAX_CUD / 60000)} minutes.`
    });

    router.get("/", getLimit, controller.get);
    router.get("/:id", getLimit, controller.getById);
    router.post("/", cudLimit, postValidator, authorisation, controller.create);
    router.put("/:id", cudLimit, putValidator, authorisation, controller.update);
    router.delete("/:id", cudLimit, authorisation, controller.delete);

    return router;
};

export default createRouter;