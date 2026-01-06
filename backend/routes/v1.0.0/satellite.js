/**
 * @file Defines the route for getting the satellites data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

// Import the CRUD functions from the controller
import {
  createSatellite,
  getSatellites,
  getSatellite,
  updateSatellite,
  deleteSatellite,
  headSatellite,
  headSatellites
} from "../../controllers/v1.0.0/satellite.js";

// Import the POST and PUT validation middleware
import {
  validatePostSatellite,
  validatePutSatellite,
  validatePatchSatellite
} from "../../middleware/validation/satellite.js";

// Import the rbac middleware
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
 * Controller object for the satellite model
 * @type {Object}
 * @property {Function} get - Getting all satellites
 * @property {Function} getById - Getting a satellite by ID
 * @property {Function} create - Creating a satellite
 * @property {Function} update - Updating a satellite
 * @property {Function} delete - Deleting a satellite
 */

const satelliteController = {
  get: getSatellites,
  getById: getSatellite,
  create: createSatellite,
  update: updateSatellite,
  delete: deleteSatellite,
  head: headSatellites,
  headById: headSatellite
};

/**
 * Creates an Express router for the endpoints of the Satellite model
 * @type {Function}
 */

const satelliteRouter = createRouter(
  satelliteController,
  getLimit,
  headLimit,
  cudLimit,
  optionsLimit,
  validatePostSatellite,
  rbac,
  validatePutSatellite,
  validatePatchSatellite,
  auth
);

export default satelliteRouter;
