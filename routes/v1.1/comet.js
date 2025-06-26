/**
 * @file Defines the routes for comet data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";  // Assuming a base router utility

// Import the CRUD functions from the controller
import {
  createComet,
  getComets,
  getComet,
  updateComet,
  deleteComet,
  headComet,
  headComets
} from "../../controllers/v1.1/comet.js";  // Controller functions for comet

// Import the POST and PUT validation middleware
import {
  validatePostComet,
  validatePutComet,
  validatePatchComet
} from "../../middleware/validation/comet.js";

// Import the authorisation middleware
import authorisation from "../../middleware/auth/authorisation.js"

// Import the rate limiting middleware
import { cudLimit, getLimit, headLimit } from "../../middleware/limiting/limit.js";

/**
 * Controller object for the comet model
 * @type {Object}
 * @property {Function} get - Getting all comets
 * @property {Function} getById - Getting a comet by ID
 * @property {Function} create - Creating a comet
 * @property {Function} update - Updating a comet
 * @property {Function} delete - Deleting a comet
 */

const cometController = {
  get: getComets,
  getById: getComet,
  create: createComet,
  update: updateComet,
  delete: deleteComet,
  head: headComets,
  headById: headComet
};

/**
 * Creates an Express router for the endpoints of the Comet model
 * @type {Function}
 */

const cometRouter = createRouter(
  cometController,
  getLimit,
  cudLimit,
  headLimit,
  validatePostComet,
  authorisation,
  validatePutComet,
  validatePatchComet
);

export default cometRouter;
