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
  headAsteroid,
  headAsteroids
} from "../../controllers/v1.0.0/asteroid.js";

// Import the POST and PUT validation middleware
import {
  validatePostAsteroid,
  validatePutAsteroid,
  validatePatchAsteroid
} from "../../middleware/validation/asteroid.js";

// Import the authorisation middleware
import rbac from "../../middleware/rbac/rbac.js"

// Import the rate limiting middleware
import { 
  getLimit,                                                                            
  headLimit,                                                              
  cudLimit,
  optionsLimit
} from "../../middleware/limiting/limit.js";

import auth from "../../middleware/auth.js";
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
  head: headAsteroids,
  headById: headAsteroid
};

/**
 * Creates an Express router for the endpoints of the Asteroid model
 * @type {Function}
 */

const asteroidRouter = createRouter(
  asteroidController,
  getLimit,
  headLimit,
  cudLimit,
  optionsLimit,
  validatePostAsteroid,
  rbac,
  validatePutAsteroid,
  validatePatchAsteroid,
  auth
);

export default asteroidRouter;
