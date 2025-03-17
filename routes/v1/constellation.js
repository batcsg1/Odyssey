/**
 * @file Defines the route for getting the constellations data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
  createConstellation,
  getConstellations,
  getConstellation,
  updateConstellation,
  deleteConstellation,
} from "../../controllers/v1/constellation.js";

import {
  validatePostConstellation,
  validatePutConstellation,
} from "../../middleware/validation/constellation.js";

const constellationController = {
  get: getConstellations,
  getById: getConstellation,
  create: createConstellation,
  update: updateConstellation,
  delete: deleteConstellation,
};

const constellationRouter = createRouter(
  constellationController,
  validatePostConstellation,
  validatePutConstellation,
);

export default constellationRouter;