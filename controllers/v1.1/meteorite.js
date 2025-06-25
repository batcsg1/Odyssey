/**
 * @file Manages business logic for meteorites
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const meteoriteRepository = new Repository("Meteorite");

const selectObject = {
  id: true,
  name: true,
  age: true,
  foundYear: true,
  mass: true,
  diameter: true,
  location: true,
  planetId: true,
  createdAt: true,
  updatedAt: true
};

/**
 * @description This function creates a new meteorite
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createMeteorite = async (req, res) => {
  try {
    // Check if planet ID is provided
    const { planetId } = req.body;

    // Check if planet exists
    if (planetId) {
      const planet = await new Repository("Planet").findById(planetId);
      if (!planet) {
        return res.status(404).json({ message: `The planet with id ${planetId} was not found` });
      }
    }

    // Meteorite to be created
    const newMeteorite = await meteoriteRepository.create(req.body);

    // Return the newly created meteorite as the response object
    const meteorite = await meteoriteRepository.findById(newMeteorite.id, selectObject);

    return res.status(201).json({
      message: "Meteorite successfully created",
      data: meteorite,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets all meteorites
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getMeteorites = async (req, res) => {
  try {

    // Filtering query parameters
    const filters = {
      name: req.query.name || undefined,
      age: req.query.age || undefined,
      foundYear: req.query.foundYear || undefined,
      mass: req.query.mass || undefined,
      diameter: req.query.diameter || undefined,
      location: req.query.location || undefined,
      planetId: req.query.planetId || undefined
    };

    // Sort query parameters
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    // Pagination query parameters
    const page = req.query.page
    const amount = req.query.amount

    // Apply filtering, sorting and pagination to meteorite model
    const meteorites = await meteoriteRepository.findAll(
      selectObject,
      filters,
      sortBy,
      sortOrder,
      page,
      amount
    );

    if (meteorites.length === 0) {
      return res.status(404).json({
        message: "No meteorites found",
        data: meteorites
      });
    }
    return res.status(200).json({
      count: meteorites.length,
      data: meteorites,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets a meteorite by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getMeteorite = async (req, res) => {
  try {

    // Find meteorite by ID
    const meteorite = await meteoriteRepository.findById(req.params.id, selectObject);

    if (!meteorite) {
      return res.status(404).json({
        message: `No meteorite with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: meteorite,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function updates a meteorite by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const updateMeteorite = async (req, res) => {
  try {
    // Check if planet ID is provided
    const { planetId } = req.body;

    // Check if planet exists
    if (planetId) {
      const planet = await new Repository("Planet").findById(planetId);
      if (!planet) {
        return res.status(404).json({ message: `The planet with id ${planetId} was not found` });
      }
    }

    // Find a meteorite by ID
    let meteorite = await meteoriteRepository.findById(req.params.id);

    if (!meteorite) {
      return res.status(404).json({
        message: `No meteorite with the id: ${req.params.id} found`,
      });
    }

    meteorite = await meteoriteRepository.update(req.params.id, req.body, selectObject);

    return res.status(200).json({
      message: `Meteorite with the id: ${req.params.id} successfully updated`,
      data: meteorite,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function deletes a meteorite by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const deleteMeteorite = async (req, res) => {
  try {

    // Meteorite to delete
    const meteorite = await meteoriteRepository.findById(req.params.id);

    if (!meteorite) {
      return res.status(404).json({
        message: `No meteorite with the id: ${req.params.id} found`,
      });
    }

    await meteoriteRepository.delete(req.params.id);
    return res.json({
      message: `Meteorite with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function checks if a meteorite exists by ID and returns just the response headers
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Sends response status
 */
const headMeteorite = async (req, res) => {
  try {
    const meteorite = await meteoriteRepository.findById(req.params.id);
    if (!meteorite) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export {
  createMeteorite,
  getMeteorites,
  getMeteorite,
  updateMeteorite,
  deleteMeteorite,
  headMeteorite
};
