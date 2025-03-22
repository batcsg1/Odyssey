/**
 * @file Defines the base url route
 * @author Samuel Batchelor
 */

// Import the Express module
import express from "express";

// Import the index controllers module
import { getIndex } from "../../controllers/v1/index.js";

// Create an Express router
const router = express.Router();

// Create a GET route
router.get("/", getIndex);

// Export the router
export default router;