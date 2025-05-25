/**
 * @file Defines the route for getting the user data
 * @author Samuel Batchelor
 */

import createUserRouter from "./user.base.js";

import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../../controllers/v1/user.js";

import {
  validatePostUser,
  validatePutUser,
} from "../../middleware/validation/user.js";

const userController = {
  get: getUsers,
  getById: getUser,
  create: createUser,
  update: updateUser,
  delete: deleteUser,
};

const userRouter = createUserRouter(
  userController,
  validatePostUser,
  validatePutUser,
);

export default userRouter;