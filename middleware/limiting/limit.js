/**
 * @file This file contains and exports the functions neccesary for limiting requests made to CRUD routes
 * @author Samuel Batchelor
 */

import rateLimit from "express-rate-limit";

const GET_WINDOW = 60 * 2000;
const CUD_WINDOW = 60 * 1000;
const MAX_GET = 20;
const MAX_CUD = 20;

const getLimit = rateLimit({
    windowMs: GET_WINDOW, // 2 minutes
    max: MAX_GET,
    message: (req, res) => {
        res.status(429).json({
            error: `You have exceeded the number of requests: ${MAX_GET}. Please try again in ${(GET_WINDOW / 60000)} minutes.`
        })
    }
});

const cudLimit = rateLimit({
    windowMs: CUD_WINDOW, // 1 minute
    max: MAX_CUD,
    message: (req, res) => {
        res.status(429).json({
            error: `You have exceeded the number of requests: ${MAX_CUD}. Please try again in ${(CUD_WINDOW / 60000)} minutes.`
        })
    }
});

export { getLimit, cudLimit }