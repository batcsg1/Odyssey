/**
 * @file Defines the route for getting the satellites data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
  createSatellite,
  getSatellites,
  getSatellite,
  updateSatellite,
  deleteSatellite,
} from "../../controllers/v1/satellite.js";

import {
  validatePostSatellite,
  validatePutSatellite,
} from "../../middleware/validation/satellite.js";

const satelliteController = {
  get: getSatellites,
  getById: getSatellite,
  create: createSatellite,
  update: updateSatellite,
  delete: deleteSatellite,
};

const satelliteRouter = createRouter(
  satelliteController,
  validatePostSatellite,
  validatePutSatellite,
);

export default satelliteRouter;
