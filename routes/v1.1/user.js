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
} from "../../controllers/v1.1/user.js";

// Import the POST and PUT validation middleware
import {
  validatePostUser,
  validatePutUser,
} from "../../middleware/validation/user.js";

import { cudLimit, getLimit } from "../../middleware/limiting/limit.js";

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
};

/**
 * Creates an Express router for the endpoints of the User model
 * @type {Function}
 */

const userRouter = createUserRouter(
  userController,
  getLimit,
  cudLimit,
  validatePostUser,
  validatePutUser,
);

export default userRouter;