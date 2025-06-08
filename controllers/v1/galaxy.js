/**
 * @file Manages business logic for galaxies
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const galaxyRepository = new Repository("Galaxy");

const selectObject = {
  id: true,
  name: true,
  type: true,
  distance: true,
  size: true,
  brightness: true,
  createdAt: true,
  updatedAt: true,
  constellationId: true
};

/**
 * @description This function creates a new galaxy
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createGalaxy = async (req, res) => {
  try {

    // New galaxy to create
    const newGalaxy = await galaxyRepository.create(req.body);

    // Return the newly created galaxy as the response object
    const galaxy = await galaxyRepository.findById(newGalaxy.id, selectObject);

    return res.status(201).json({
      message: "Galaxy successfully created",
      data: galaxy,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets all galaxies
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getGalaxies = async (req, res) => {
  try {

    // Filtering query parameters
    const filters = {
      name: req.query.name || undefined,
      type: req.query.type || undefined,
      distance: req.query.distance || undefined,
      size: req.query.size || undefined,
      brightness: req.query.brightness || undefined,
      constellationId: req.query.constellationId || undefined
    }

    // Sort query parameters
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    // Pagination query parameters
    const page = req.query.page
    const amount = req.query.amount

    // Apply filtering, sorting and pagination to galaxy model
    const galaxies = await galaxyRepository.findAll(
      selectObject,
      filters,
      sortBy,
      sortOrder,
      page,
      amount
    );

    if (galaxies.length === 0) {
      return res.status(404).json({
        message: "No galaxies found",
        data: galaxies
      });
    }
    return res.status(200).json({
      count: galaxies.length,
      data: galaxies,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets a galaxy by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getGalaxy = async (req, res) => {
  try {

    // Find galaxy by ID
    const galaxy = await galaxyRepository.findById(req.params.id, selectObject);

    if (!galaxy) {
      return res.status(404).json({
        message: `No galaxy with the id: ${req.params.id} found`,
      });
    }

    return res.status(200).json({
      data: galaxy,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function updates a galaxy by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const updateGalaxy = async (req, res) => {
  try {

    // Find a galaxy by ID
    let galaxy = await galaxyRepository.findById(req.params.id);

    if (!galaxy) {
      return res.status(404).json({
        message: `No galaxy with the id: ${req.params.id} found`,
      });
    }

    galaxy = await galaxyRepository.update(req.params.id, req.body, selectObject);

    return res.status(200).json({
      message: `Galaxy with the id: ${req.params.id} successfully updated`,
      data: galaxy,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function deletes a galaxy by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const deleteGalaxy = async (req, res) => {
  try {

    // Galaxy to delete
    const galaxy = await galaxyRepository.findById(req.params.id);

    if (!galaxy) {
      return res.status(404).json({
        message: `No galaxy with the id: ${req.params.id} found`,
      });
    }

    await galaxyRepository.delete(req.params.id);
    return res.json({
      message: `Galaxy with the id: ${req.params.id} successfully deleted`,
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createGalaxy,
  getGalaxies,
  getGalaxy,
  updateGalaxy,
  deleteGalaxy,
};
