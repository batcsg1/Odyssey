/**
 * @file Defines the route for getting the galaxy data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

// Import the CRUD functions from the controller
import {
  createGalaxy,
  getGalaxies,
  getGalaxy,
  updateGalaxy,
  deleteGalaxy,
  headGalaxy,
  headGalaxies
} from "../../controllers/v1.0.0/galaxy.js";

// Import the POST, PUT and PATCH validation middleware
import {
  validatePostGalaxy,
  validatePutGalaxy,
  validatePatchGalaxy
} from "../../middleware/validation/galaxy.js";

// Import the rbac middleware
import rbac from "../../middleware/auth/rbac.js"

// Import the rate limiting middleware
import { 
  getLimit,                                                                            
  headLimit,                                                              
  cudLimit,
  optionsLimit
} from "../../middleware/limiting/limit.js";
import auth from "../../middleware/auth.js";
/**
 * Controller object for the galaxy model
 * @type {Object}
 * @property {Function} get - Getting all galaxys
 * @property {Function} getById - Getting a galaxy by ID
 * @property {Function} create - Creating a galaxy
 * @property {Function} update - Updating a galaxy
 * @property {Function} delete - Deleting a galaxy
 */

const galaxyController = {
  get: getGalaxies,
  getById: getGalaxy,
  create: createGalaxy,
  update: updateGalaxy,
  delete: deleteGalaxy,
  head: headGalaxies,
  headById: headGalaxy
};

/**
 * Creates an Express router for the endpoints of the Galaxy model
 * @type {Function}
 */

const galaxyRouter = createRouter(
  galaxyController,
  getLimit,
  headLimit,
  cudLimit,
  optionsLimit,
  validatePostGalaxy,
  rbac,
  validatePutGalaxy,
  validatePatchGalaxy,
  auth
);

export default galaxyRouter;
