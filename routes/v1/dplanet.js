/**
 * @file Defines the route for getting the dwarf planets data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
  createDwarfPlanet,
  getDwarfPlanets,
  getDwarfPlanet,
  updateDwarfPlanet,
  deleteDwarfPlanet,
} from "../../controllers/v1/dplanet.js";

import {
  validatePostDwarfPlanet,
  validatePutDwarfPlanet,
} from "../../middleware/validation/dplanet.js";

const dwarfPlanetController = {
  get: getDwarfPlanets,
  getById: getDwarfPlanet,
  create: createDwarfPlanet,
  update: updateDwarfPlanet,
  delete: deleteDwarfPlanet,
};

const dwarfPlanetRouter = createRouter(
  dwarfPlanetController,
  validatePostDwarfPlanet,
  validatePutDwarfPlanet,
);

export default dwarfPlanetRouter;
