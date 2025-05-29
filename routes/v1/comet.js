/**
 * @file Defines the routes for comet data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";  // Assuming a base router utility

import {
  createComet,
  getComets,
  getComet,
  updateComet,
  deleteComet,
} from "../../controllers/v1/comet.js";  // Controller functions for comet

import {
  validatePostComet,
  validatePutComet,
} from "../../middleware/validation/comet.js";  // Validation middleware for comet

import authorisation from "../../middleware/auth/authorisation.js"

const cometController = {
  get: getComets,
  getById: getComet,
  create: createComet,
  update: updateComet,
  delete: deleteComet,
};

const cometRouter = createRouter(
  cometController,
  validatePostComet,  // Validate on POST (create) requests
  authorisation,
  validatePutComet    // Validate on PUT (update) requests
);

export default cometRouter;
