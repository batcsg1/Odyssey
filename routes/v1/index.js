/**
 * @file Defines the base url route
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
  getIndex
} from "../../controllers/v1/index.js";

const indexController = {
  get: getIndex,
};

const indexRouter = createRouter(
  indexController
);

export default indexRouter;
