/**
 * @file Manages business logic for comets
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

// Create a repository for the Comet model
const cometRepository = new Repository("Comet");

const selectObject = {
  id: true,
  name: true,
  age: true,
  mass: true,
  diameter: true,
  density: true,
  type: true,
  year: true,
  perigee: true,
  apogee: true,
  brightness: true,
  location: true,
  starId: true,
  createdAt: true,
  updatedAt: true
};

/**
 * @description This function creates a new comet
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createComet = async (req, res) => {
  try {
    const { starId } = req.body;

    // Check if star exists
    if (starId) {
      const star = await new Repository("Star").findById(starId);
      if (!star) {
        return res.status(404).json({ message: `Star with id ${starId} not found` });
      }
    }

    // Comet to be created
    const newComet = await cometRepository.create(req.body);

    // Return the newly created comet as the response object
    const comet = await cometRepository.findById(newComet.id, selectObject);

    return res.status(201).json({
      message: "Comet successfully created",
      data: comet,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets all comets
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getComets = async (req, res) => {
  try {

    // Filtering query parameters
    const filters = {
      name: req.query.name || undefined,
      age: req.query.age || undefined,
      mass: req.query.mass || undefined,
      diameter: req.query.diameter || undefined,
      density: req.query.density || undefined,
      type: req.query.type || undefined,
      year: req.query.year || undefined,
      perigee: req.query.perigee || undefined,
      apogee: req.query.apogee || undefined,
      brightness: req.query.brightness || undefined,
      location: req.query.location || undefined,
      starId: req.query.starId || undefined
    };

    // Sort query parameters
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    // Pagination query parameters
    const page = req.query.page
    const amount = req.query.amount

    // Apply filtering, sorting and pagination to comet model
    const comets = await cometRepository.findAll(
      selectObject,
      filters,
      sortBy,
      sortOrder,
      page,
      amount
    );

    if (comets.length === 0) {
      return res.status(404).json({
        message: "No comets found",
        data: comets
      });
    }
    return res.status(200).json({
      count: comets.length,
      data: comets,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets a comet by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getComet = async (req, res) => {
  try {

    // Find comet by ID
    const comet = await cometRepository.findById(req.params.id, selectObject);

    if (!comet) {
      return res.status(404).json({
        message: `No comet with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: comet,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function updates a comet by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const updateComet = async (req, res) => {
  try {
    // Check if star ID is provided
    const { starId } = req.body;

    // Check if star exists
    if (starId) {
      const star = await new Repository("Star").findById(starId);
      if (!star) {
        return res.status(404).json({ message: `Star with id ${starId} not found` });
      }
    }

    let comet = await cometRepository.findById(req.params.id);
    if (!comet) {
      return res.status(404).json({
        message: `No comet with the id: ${req.params.id} found`,
      });
    }
    comet = await cometRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Comet with the id: ${req.params.id} successfully updated`,
      data: comet,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function deletes a comet by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const deleteComet = async (req, res) => {
  try {

    // Comet to delete
    const comet = await cometRepository.findById(req.params.id);

    if (!comet) {
      return res.status(404).json({
        message: `No comet with the id: ${req.params.id} found`,
      });
    }
    await cometRepository.delete(req.params.id);
    return res.json({
      message: `Comet with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function checks if comets exist and returns just the response headers
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Sends response status
 */
const headComets = async (req, res) => {
  try {
    const comets = await cometRepository.findAll();

    // Set custom header with count before responding
    res.set("X-Comet-Count", comets.length);

    if (comets.length === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  } catch (err) {
    console.log(err)
    return res.sendStatus(500);
  }
};

/**
 * @description This function checks if a comet exists by ID and returns just the response headers
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Sends response status
 */
const headComet = async (req, res) => {
  try {
    const comet = await cometRepository.findById(req.params.id);

    // Set custom header to check if comet exists
    res.set("X-Comet-Exists", comet ? "true" : "false");

    if (!comet) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export {
  createComet,
  getComets,
  getComet,
  updateComet,
  deleteComet,
  headComets,
  headComet
};
