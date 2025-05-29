/**
 * @file Defines the route for getting the stars data
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
  createStar,
  getStars,
  getStar,
  updateStar,
  deleteStar,
} from "../../controllers/v1/star.js";

import {
  validatePostStar,
  validatePutStar,
} from "../../middleware/validation/star.js";

import authorisation from "../../middleware/auth/authorisation.js"

const starController = {
  get: getStars,
  getById: getStar,
  create: createStar,
  update: updateStar,
  delete: deleteStar,
};

const starRouter = createRouter(
  starController,
  validatePostStar,
  authorisation,
  validatePutStar,
);

export default starRouter;
