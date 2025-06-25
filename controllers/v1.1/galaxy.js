/**
 * @file Manages business logic for galaxies
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";
import advancedRepository from "../../repositories/advanced.js"

const galaxyRepository = new Repository("Galaxy");
const advanced = new advancedRepository("Galaxy");

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
    // Check if galaxyId is provided
    const { constellationId } = req.body;

    if (constellationId) {
      // Check if constellation exists
      const constellation = await new Repository("Constellation").findById(constellationId);
      if (!constellation) {
        return res.status(404).json({ message: `The constellation with id ${constellationId} was not found` });
      }
    }

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
    // Check if galaxyId is provided
    const { constellationId } = req.body;

    if (constellationId) {
      // Check if constellation exists
      const constellation = await new Repository("Constellation").findById(constellationId);
      if (!constellation) {
        return res.status(404).json({ message: `The constellation with id ${constellationId} was not found` });
      }
    }
    
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

    // Any objects that reference a galaxy
    const children = await advanced.findChildren(["Star"], {
      galaxyId: galaxy.id
    });

    if (children.length > 0) {
      return res.status(409).json({
        message: `Galaxy with the id: ${galaxy.id} cannot be deleted because it has child objects`,
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

/**
 * @description This function checks if a galaxy exists by ID and returns just the response headers
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Sends response status
 */
const headGalaxy = async (req, res) => {
  try {
    const galaxy = await galaxyRepository.findById(req.params.id);
    if (!galaxy) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export {
  createGalaxy,
  getGalaxies,
  getGalaxy,
  updateGalaxy,
  deleteGalaxy,
  headGalaxy
};
