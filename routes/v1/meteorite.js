/**
 * @file Defines the route for managing meteorite data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
  createMeteorite,
  getMeteorites,
  getMeteorite,
  updateMeteorite,
  deleteMeteorite,
} from "../../controllers/v1/meteorite.js";

import {
  validatePostMeteorite,
  validatePutMeteorite,
} from "../../middleware/validation/meteorite.js";

const meteoriteController = {
  get: getMeteorites,
  getById: getMeteorite,
  create: createMeteorite,
  update: updateMeteorite,
  delete: deleteMeteorite,
};

const meteoriteRouter = createRouter(
  meteoriteController,
  validatePostMeteorite,
  validatePutMeteorite,
);

export default meteoriteRouter;
