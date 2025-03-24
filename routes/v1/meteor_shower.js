/**
 * @file Defines the routes for handling meteor shower data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
  createMeteorShower,
  getMeteorShowers,
  getMeteorShower,
  updateMeteorShower,
  deleteMeteorShower,
} from "../../controllers/v1/meteor_shower.js";

import {
  validatePostMeteorShower,
  validatePutMeteorShower,
} from "../../middleware/validation/meteor_shower.js";

const meteorShowerController = {
  get: getMeteorShowers,
  getById: getMeteorShower,
  create: createMeteorShower,
  update: updateMeteorShower,
  delete: deleteMeteorShower,
};

const meteorShowerRouter = createRouter(
  meteorShowerController,
  validatePostMeteorShower,
  validatePutMeteorShower,
);

export default meteorShowerRouter;
