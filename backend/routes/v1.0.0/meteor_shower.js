/**
 * @file Defines the routes for handling meteor shower data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

// Import the CRUD functions from the controller
import {
  createMeteorShower,
  getMeteorShowers,
  getMeteorShower,
  updateMeteorShower,
  deleteMeteorShower,
  headMeteorShower,
  headMeteorShowers
} from "../../controllers/v1.0.0/meteor_shower.js";

// Import the POST and PUT validation middleware
import {
  validatePostMeteorShower,
  validatePutMeteorShower,
  validatePatchMeteorShower
} from "../../middleware/validation/meteor_shower.js";

// Import the authorisation middleware
import authorisation from "../../middleware/auth/authorisation.js"

// Import the rate limiting middleware
import { 
  getLimit,                                                                            
  headLimit,                                                              
  cudLimit,
  optionsLimit
} from "../../middleware/limiting/limit.js";

import auth from "../../middleware/auth.js";
/**
 * Controller object for the meteor shower model
 * @type {Object}
 * @property {Function} get - Getting all meteor showers
 * @property {Function} getById - Getting a meteor shower by ID
 * @property {Function} create - Creating a meteor shower
 * @property {Function} update - Updating a meteor shower
 * @property {Function} delete - Deleting a meteor shower
 */

const meteorShowerController = {
  get: getMeteorShowers,
  getById: getMeteorShower,
  create: createMeteorShower,
  update: updateMeteorShower,
  delete: deleteMeteorShower,
  head: headMeteorShowers,
  headById: headMeteorShower
};

/**
 * Creates an Express router for the endpoints of the Meteor Shower model
 * @type {Function}
 */

const meteorShowerRouter = createRouter(
  meteorShowerController,
  getLimit,
  headLimit,
  cudLimit,
  optionsLimit,
  validatePostMeteorShower,
  authorisation,
  validatePutMeteorShower,
  validatePatchMeteorShower,
  auth
);

export default meteorShowerRouter;
