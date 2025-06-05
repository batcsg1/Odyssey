/**
 * @file Defines the route for getting the asteroid data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

// Import the CRUD functions from the controller
import {
  createAsteroid,
  getAsteroids,
  getAsteroid,
  updateAsteroid,
  deleteAsteroid,
} from "../../controllers/v1/asteroid.js";

// Import the POST and PUT validation middleware
import {
  validatePostAsteroid,
  validatePutAsteroid,
} from "../../middleware/validation/asteroid.js";

// Import the authorisation middleware
import authorisation from "../../middleware/auth/authorisation.js"
import { cudLimit, getLimit } from "../../middleware/limiting/limit.js";


/**
 * Controller object for the asteroid model
 * @type {Object}
 * @property {Function} get - Getting all asteroids
 * @property {Function} getById - Getting a asteroid by ID
 * @property {Function} create - Creating a asteroid
 * @property {Function} update - Updating a asteroid
 * @property {Function} delete - Deleting a asteroid
 */

const asteroidController = {
  get: getAsteroids,
  getById: getAsteroid,
  create: createAsteroid,
  update: updateAsteroid,
  delete: deleteAsteroid,
};

/**
 * Creates an Express router for the endpoints of the Asteroid model
 * @type {Function}
 */

const asteroidRouter = createRouter(
  asteroidController,
  getLimit,
  cudLimit,
  validatePostAsteroid,
  authorisation,
  validatePutAsteroid,
);

export default asteroidRouter;
