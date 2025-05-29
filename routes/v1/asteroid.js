/**
 * @file Defines the route for getting the asteroid data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
  createAsteroid,
  getAsteroids,
  getAsteroid,
  updateAsteroid,
  deleteAsteroid,
} from "../../controllers/v1/asteroid.js";

import {
  validatePostAsteroid,
  validatePutAsteroid,
} from "../../middleware/validation/asteroid.js";

import authorisation from "../../middleware/auth/authorisation.js"

const asteroidController = {
  get: getAsteroids,
  getById: getAsteroid,
  create: createAsteroid,
  update: updateAsteroid,
  delete: deleteAsteroid,
};

const asteroidRouter = createRouter(
  asteroidController,
  validatePostAsteroid,
  authorisation,
  validatePutAsteroid,
);

export default asteroidRouter;
