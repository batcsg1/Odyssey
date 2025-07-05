/**
 * @file Defines the route for getting the user data
 * @author Samuel Batchelor
 */

import createUserRouter from "./user.base.js";

// Import the CRUD functions from the controller
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  headUser,
  headUsers
} from "../../controllers/v1.2/user.js";

// Import the POST and PUT validation middleware
import {
  validatePostUser,
  validatePutUser,
  validatePatchUser
} from "../../middleware/validation/user.js";

// Import the rate limiting middleware
import { 
  getLimit,                                                                            
  headLimit,                                                              
  cudLimit,
  optionsLimit
} from "../../middleware/limiting/limit.js";
/**
 * Controller object for the user model
 * @type {Object}
 * @property {Function} get - Getting all users
 * @property {Function} getById - Getting a user by ID
 * @property {Function} create - Creating a user
 * @property {Function} update - Updating a user
 * @property {Function} delete - Deleting a user
 */

const userController = {
  get: getUsers,
  getById: getUser,
  create: createUser,
  update: updateUser,
  delete: deleteUser,
  head: headUsers,
  headById: headUser
};

/**
 * Creates an Express router for the endpoints of the User model
 * @type {Function}
 */

const userRouter = createUserRouter(
  userController,
  getLimit,
  headLimit,
  cudLimit,
  optionsLimit,
  validatePostUser,
  validatePutUser,
  validatePatchUser
);

export default userRouter;