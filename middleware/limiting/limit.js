/**
 * @file This file contains and exports the functions neccesary for limiting requests made to CRUD routes
 * @author Samuel Batchelor
 */

import rateLimit from "express-rate-limit";

const createRateLimiter = (windowMs, max) =>
  rateLimit({
    windowMs,
    max,
    message: (req, res) => {
      res.status(429).json({
        message: `You have exceeded the number of requests: ${max}. Please try again in ${windowMs / 60000} minutes.`,
      });
    },
  });


/**
 * @description GET, GETbyID rate limiting middleware
 * @returns {function} - A callback function that declares the rate limiting within a time window
 */
export const getLimit = () => createRateLimiter(2 * 60 * 1000, 20);
// * All get requests are limited to 20 requests every 2 minutes *

/**
 * @description HEAD, HEADbyID rate limiting middleware
 * @returns {function} - A callback function that declares the rate limiting within a time window
 */
export const headLimit = () => createRateLimiter(2 * 60 * 1000, 60);
// * All head requests are limited to 60 requests every 2 minutes *

/**
 * @description PUT, PATCH & DELETE rate limiting middleware
 * @returns {function} - A callback function that declares the rate limiting within a time window
 */
export const cudLimit = () => createRateLimiter(1 * 60 * 1000, 10);
// * All create, update and delete requests are limited to 10 requests every minute *

/**
 * @description OPTIONS rate limiting middleware
 * @returns {function} - A callback function that declares the rate limiting within a time window
 */
export const optionsLimit = () => createRateLimiter(3 * 60 * 1000, 30);
// * All options requests are limited to 30 requests every 3 minutes *
