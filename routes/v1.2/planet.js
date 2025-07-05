/**
 * @file Defines the route for getting the planets data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

// Import the CRUD functions from the controller
import {
  createPlanet,
  getPlanets,
  getPlanet,
  updatePlanet,
  deletePlanet,
  headPlanet,
  headPlanets
} from "../../controllers/v1.1/planet.js";

// Import the POST and PUT validation middleware
import {
  validatePostPlanet,
  validatePutPlanet,
  validatePatchPlanet
} from "../../middleware/validation/planet.js";

// Import the authorisation middleware
import authorisation from "../../middleware/auth/authorisation.js"

// Import the rate limiting middleware
import { 
  getLimit,                                                                            
  headLimit,                                                              
  cudLimit,
  optionsLimit
} from "../../middleware/limiting/limit.js";
/**
 * Controller object for the planet model
 * @type {Object}
 * @property {Function} get - Getting all planets
 * @property {Function} getById - Getting a planet by ID
 * @property {Function} create - Creating a planet
 * @property {Function} update - Updating a planet
 * @property {Function} delete - Deleting a planet
 */

const planetController = {
  get: getPlanets,
  getById: getPlanet,
  create: createPlanet,
  update: updatePlanet,
  delete: deletePlanet,
  head: headPlanets,
  headById: headPlanet
};

/**
 * Creates an Express router for the endpoints of the Planet model
 * @type {Function}
 */

const planetRouter = createRouter(
  planetController,
  getLimit,
  headLimit,
  cudLimit,
  optionsLimit,
  validatePostPlanet,
  authorisation,
  validatePutPlanet,
  validatePatchPlanet
);

export default planetRouter;
