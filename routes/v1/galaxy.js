/**
 * @file Defines the route for getting the galaxy data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
  createGalaxy,
  getGalaxies,
  getGalaxy,
  updateGalaxy,
  deleteGalaxy,
} from "../../controllers/v1/galaxy.js";

import {
  validatePostGalaxy,
  validatePutGalaxy,
} from "../../middleware/validation/galaxy.js";

const galaxyController = {
  get: getGalaxy,
  getById: getGalaxy,
  create: createGalaxy,
  update: updateGalaxy,
  delete: deleteGalaxy,
};

const galaxyRouter = createRouter(
  galaxyController,
  validatePostGalaxy,
  validatePutGalaxy,
);

export default galaxyRouter;
