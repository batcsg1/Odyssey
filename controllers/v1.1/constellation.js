/**
 * @file Manages business logic for constellations
 * @author Samuel Batchelor
 */

import advancedRepository from "../../repositories/advanced.js";
import Repository from "../../repositories/generic.js";

const constellationRepository = new Repository("Constellation");

const advanced = new advancedRepository("Constellation");

const selectObject = {
  id: true,
  name: true,
  shape: true,
  area: true,
  abbreviation: true
};

/**
 * @description This function creates a new constellation
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createConstellation = async (req, res) => {
  try {
    
    // New constellation to create
    const newConstellation = await constellationRepository.create(req.body);

    // Return the newly created constellation as the response object
    const constellation = await constellationRepository.findById(newConstellation.id, selectObject);

    return res.status(201).json({
      message: "Constellation successfully created",
      data: constellation,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets all constellations
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getConstellations = async (req, res) => {
  try {

    // Filtering query parameters
    const filters = {
      name: req.query.name || undefined,
      shape: req.query.shape || undefined,
      area: req.query.area || undefined,
      abbreviation: req.query.abbreviation || undefined,
    }

    // Sort query parameters
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    // Pagination query parameters
    const page = req.query.page
    const amount = req.query.amount

    // Apply filtering, sorting and pagination to constellation model
    const constellations = await constellationRepository.findAll(
      selectObject,
      filters,
      sortBy,
      sortOrder,
      page,
      amount
    );

    if (constellations.length === 0) {
      return res.status(404).json({
        message: "No constellations found",
        data: constellations
      });
    }
    return res.status(200).json({
      count: constellations.length,
      data: constellations,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets a constellation by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getConstellation = async (req, res) => {
  try {

    // Find constellation by ID
    const constellation = await constellationRepository.findById(req.params.id, selectObject);

    if (!constellation) {
      return res.status(404).json({
        message: `No constellation with the id: ${req.params.id} found`,
      });
    }

    return res.status(200).json({
      data: constellation,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function updates a constellation by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const updateConstellation = async (req, res) => {
  try {

    // Find a constellation by ID
    let constellation = await constellationRepository.findById(req.params.id);

    if (!constellation) {
      return res.status(404).json({
        message: `No constellation with the id: ${req.params.id} found`,
      });
    }

    constellation = await constellationRepository.update(req.params.id, req.body, selectObject);

    return res.status(200).json({
      message: `Constellation with the id: ${req.params.id} successfully updated`,
      data: constellation,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function deletes a constellation by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const deleteConstellation = async (req, res) => {
  try {

    // Constellation to delete
    const constellation = await constellationRepository.findById(req.params.id);

    if (!constellation) {
      return res.status(404).json({
        message: `No constellation with the id: ${req.params.id} found`,
      });
    }

    // Any objects that reference a constellation
    const children = await advanced.findManyByForeignKeys(["Star", "Galaxy", "MeteorShower"], {
      constellationId: constellation.id
    });

    if (children.length > 0) {
      return res.status(409).json({
        message: `Constellation with the id: ${constellation.id} cannot be deleted because it has child objects`,
      });
    }

    await constellationRepository.delete(req.params.id);
    return res.json({
      message: `Constellation with the id: ${req.params.id} successfully deleted`,
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createConstellation,
  getConstellations,
  getConstellation,
  updateConstellation,
  deleteConstellation,
};
