/**
 * @file Manages business logic for stars
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const starRepository = new Repository("Star");

const selectObject = {
  id: true,
  name: true,
  age: true,
  mass: true,
  diameter: true,
  type: true,
  distance: true,
  temperature: true,
  luminosity: true,
  hasPlanets: true,
  brightness: true,
  constellationId: true,
  galaxyId: true,
  createdAt: true,
  updatedAt: true
};

/**
 * @description This function creates a new star
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createStar = async (req, res) => {
  try {
    // Check if galaxyId is provided
    const { galaxyId, constellationId } = req.body;

    if (galaxyId) {
      // Check if galaxy exists
      const galaxy = await new Repository("Galaxy").findById(galaxyId);
      if (!galaxy) {
        return res.status(404).json({ message: `The galaxy with id ${galaxyId} was not found` });
      }
    }

    if (constellationId) {
      // Check if constellation exists
      const constellation = await new Repository("Constellation").findById(constellationId);
      if (!constellation) {
        return res.status(404).json({ message: `The constellation with id ${constellationId} was not found` });
      }
    }

    // New star to create
    const newStar = await starRepository.create(req.body);

    // Return the newly created star as the response object
    const star = await starRepository.findById(newStar.id, selectObject);

    return res.status(201).json({
      message: "Star successfully created",
      data: star,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets all stars
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getStars = async (req, res) => {
  try {

    // Filtering query parameters
    const filters = {
      name: req.query.name || undefined,
      age: req.query.age || undefined,
      mass: req.query.mass || undefined,
      diameter: req.query.diameter || undefined,
      type: req.query.type || undefined,
      distance: req.query.distance || undefined,
      temperature: req.query.temperature || undefined,
      luminosity: req.query.luminosity || undefined,
      hasPlanets: req.query.hasPlanets || undefined,
      brightness: req.query.brightness || undefined,
      constellationId: req.query.constellationId || undefined,
      galaxyId: req.query.galaxyId || undefined
    }

    // Sort query parameters
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    // Pagination query parameters
    const page = req.query.page
    const amount = req.query.amount

    // Apply filtering, sorting and pagination to star model
    const stars = await starRepository.findAll(
      selectObject,
      filters,
      sortBy,
      sortOrder,
      page,
      amount
    );

    if (stars.length === 0) {
      return res.status(404).json({
        message: "No stars found",
        data: stars
      });
    }
    return res.status(200).json({
      count: stars.length,
      data: stars,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets a star by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getStar = async (req, res) => {
  try {

    // Find star by ID
    const star = await starRepository.findById(req.params.id, selectObject);

    if (!star) {
      return res.status(404).json({
        message: `No star with the id: ${req.params.id} found`,
      });
    }

    return res.status(200).json({
      data: star,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function updates a star by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const updateStar = async (req, res) => {
  try {
    // Check if galaxyId is provided
    const { galaxyId, constellationId } = req.body;

    if (galaxyId) {
      // Check if galaxy exists
      const galaxy = await new Repository("Galaxy").findById(galaxyId);
      if (!galaxy) {
        return res.status(404).json({ message: `The galaxy with id ${galaxyId} was not found` });
      }
    }

    if (constellationId) {
      // Check if constellation exists
      const constellation = await new Repository("Constellation").findById(constellationId);
      if (!constellation) {
        return res.status(404).json({ message: `The constellation with id ${constellationId} was not found` });
      }
    }

    // Find a star by ID
    let star = await starRepository.findById(req.params.id);

    if (!star) {
      return res.status(404).json({
        message: `No star with the id: ${req.params.id} found`,
      });
    }

    star = await starRepository.update(req.params.id, req.body, selectObject);

    return res.status(200).json({
      message: `Star with the id: ${req.params.id} successfully updated`,
      data: star,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function deletes a star by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const deleteStar = async (req, res) => {
  try {

    // Star to delete
    const star = await starRepository.findById(req.params.id);

    if (!star) {
      return res.status(404).json({
        message: `No star with the id: ${req.params.id} found`,
      });
    }

    await starRepository.delete(req.params.id);
    return res.json({
      message: `Star with the id: ${req.params.id} successfully deleted`,
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createStar,
  getStars,
  getStar,
  updateStar,
  deleteStar,
};
