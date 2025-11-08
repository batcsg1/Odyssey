/**
 * @file Defines the route for getting the constellations data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

// Import the CRUD functions from the controller
import {
  createConstellation,
  getConstellations,
  getConstellation,
  updateConstellation,
  deleteConstellation,
  headConstellation,
  headConstellations
} from "../../controllers/v1.0.0/constellation.js";

// Import the POST, PUT and PATCH validation middleware
import {
  validatePostConstellation,
  validatePutConstellation,
  validatePatchConstellation
} from "../../middleware/validation/constellation.js";

// Import the authorisation middleware
import authorisation from "../../middleware/auth/authorisation.js"

// Import the rate limiting middleware
import { getLimit, headLimit, cudLimit, optionsLimit } from "../../middleware/limiting/limit.js";

/**
 * Controller object for the constellation model
 * @type {Object}
 * @property {Function} get - Getting all constellations
 * @property {Function} getById - Getting a constellation by ID
 * @property {Function} create - Creating a constellation
 * @property {Function} update - Updating a constellation
 * @property {Function} delete - Deleting a constellation
 */

const constellationController = {
  get: getConstellations,
  getById: getConstellation,
  create: createConstellation,
  update: updateConstellation,
  delete: deleteConstellation,
  head: headConstellations,
  headById: headConstellation
};

/**
 * Creates an Express router for the endpoints of the Constellation model
 * @type {Function}
 */

const constellationRouter = createRouter(
  constellationController,
  getLimit,
  headLimit,
  cudLimit,
  optionsLimit,
  validatePostConstellation,
  authorisation,
  validatePutConstellation,
  validatePatchConstellation
);

export default constellationRouter;