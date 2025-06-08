/**
 * @file Manages business logic for satellites
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const satelliteRepository = new Repository("Satellite");

const selectObject = {
  id: true,
  name: true,
  age: true,
  mass: true,
  diameter: true,
  density: true,
  type: true,
  atmosphere: true,
  year: true,
  perigee: true,
  apogee: true,
  tilt: true,
  minTemp: true,
  maxTemp: true,
  gravity: true,
  day: true,
  brightness: true,
  location: true,
  habitable: true,
  planetId: true,
  createdAt: true,
  updatedAt: true
};

/**
 * @description This function creates a new satellite
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createSatellite = async (req, res) => {
  try {
    // Check if planet ID is provided
    const planetId = req.body.planetId;

    // Check if planet exists
    const planet = await new Repository("Planet").findById(planetId);
    if (!planet) {
      return res.status(404).json({ message: `The planet with id ${planetId} was not found` });
    }

    // Satellite to be created
    const newSatellite = await satelliteRepository.create(req.body);

    // Return the newly created satellite as the response object
    const satellite = await satelliteRepository.findById(newSatellite.id, selectObject);

    return res.status(201).json({
      message: "Satellite successfully created",
      data: satellite,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets all satellites
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getSatellites = async (req, res) => {
  try {

    // Filtering query parameters
    const filters = {
      name: req.query.name || undefined,
      age: req.query.age || undefined,
      mass: req.query.mass || undefined,
      diameter: req.query.diameter || undefined,
      density: req.query.density || undefined,
      type: req.query.type || undefined,
      atmosphere: req.query.atmosphere || undefined,
      year: req.query.year || undefined,
      perigee: req.query.perigee || undefined,
      apogee: req.query.apogee || undefined,
      tilt: req.query.tilt || undefined,
      minTemp: req.query.minTemp || undefined,
      maxTemp: req.query.maxTemp || undefined,
      gravity: req.query.gravity || undefined,
      day: req.query.day || undefined,
      brightness: req.query.brightness || undefined,
      location: req.query.location || undefined,
      habitable: req.query.habitable || undefined,
      planetId: req.query.planetId || undefined
    };

    // Sort query parameters
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    // Pagination query parameters
    const page = req.query.page
    const amount = req.query.amount

    // Apply filtering, sorting and pagination to satellite model
    const satellites = await satelliteRepository.findAll(
      selectObject,
      filters,
      sortBy,
      sortOrder,
      page,
      amount
    );

    if (satellites.length === 0) {
      return res.status(404).json({ 
        message: "No satellites found",
        data: satellites
      });
    }
    return res.status(200).json({
      count: satellites.length,
      data: satellites,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets a satellite by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getSatellite = async (req, res) => {
  try {

    // Find satellite by ID
    const satellite = await satelliteRepository.findById(req.params.id, selectObject);

    if (!satellite) {
      return res.status(404).json({
        message: `No satellite with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: satellite,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function updates a satellite by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const updateSatellite = async (req, res) => {
  try {

    // Find a satellite by ID
    let satellite = await satelliteRepository.findById(req.params.id);

    if (!satellite) {
      return res.status(404).json({
        message: `No satellite with the id: ${req.params.id} found`,
      });
    }

    satellite = await satelliteRepository.update(req.params.id, req.body, selectObject);

    return res.status(200).json({
      message: `Satellite with the id: ${req.params.id} successfully updated`,
      data: satellite,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function deletes a satellite by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const deleteSatellite = async (req, res) => {
  try {

    // Satellite to delete
    const satellite = await satelliteRepository.findById(req.params.id);

    if (!satellite) {
      return res.status(404).json({
        message: `No satellite with the id: ${req.params.id} found`,
      });
    }

    await satelliteRepository.delete(req.params.id);
    return res.json({
      message: `Satellite with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createSatellite,
  getSatellites,
  getSatellite,
  updateSatellite,
  deleteSatellite,
};
