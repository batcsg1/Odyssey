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
} from "../../controllers/v1/meteor_shower.js";

// Import the POST and PUT validation middleware
import {
  validatePostMeteorShower,
  validatePutMeteorShower,
} from "../../middleware/validation/meteor_shower.js";

// Import the authorisation middleware
import authorisation from "../../middleware/auth/authorisation.js"
import { cudLimit, getLimit } from "../../middleware/limiting/limit.js";

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
};

/**
 * Creates an Express router for the endpoints of the Meteor Shower model
 * @type {Function}
 */

const meteorShowerRouter = createRouter(
  meteorShowerController,
  getLimit,
  cudLimit,
  validatePostMeteorShower,
  authorisation,
  validatePutMeteorShower,
);

export default meteorShowerRouter;
