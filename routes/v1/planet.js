/**
 * @file Defines the route for getting the planets data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
  createPlanet,
  getPlanets,
  getPlanet,
  updatePlanet,
  deletePlanet,
} from "../../controllers/v1/planet.js";

import {
  validatePostPlanet,
  validatePutPlanet,
} from "../../middleware/validation/planet.js";

const planetController = {
  get: getPlanets,
  getById: getPlanet,
  create: createPlanet,
  update: updatePlanet,
  delete: deletePlanet,
};

const planetRouter = createRouter(
  planetController,
  validatePostPlanet,
  validatePutPlanet,
);

export default planetRouter;
