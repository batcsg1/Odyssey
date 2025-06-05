/**
 * @file This file contains and exports the functions neccesary for limiting requests made to CRUD routes
 * @author Samuel Batchelor
 */

import rateLimit from "express-rate-limit";

// Anonymous function for creating a rate limiter

const createRateLimiter = (windowMs, max) => rateLimit({
    windowMs,
    max,
    message: (req, res) => {
        res.status(429).json({
            message: `You have exceeded the number of requests: ${max}. Please try again in ${(windowMs / 60000)} minutes.`
        })
    }
});

// GET and GETbyID rate limiting functions
export const getLimit = () => createRateLimiter(2 * 60 * 1000, 20); 
// CREATE, UPDATE and DELETE rate limiting functions
export const cudLimit = () => createRateLimiter(1 * 60 * 1000, 20);