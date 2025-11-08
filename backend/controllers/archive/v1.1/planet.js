/**
 * @file Manages business logic for planets
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";
import advancedRepository from "../../repositories/advanced.js";

const planetRepository = new Repository("Planet");
const advanced = new advancedRepository("Planet");

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
  hasSatellites: true,
  minTemp: true,
  maxTemp: true,
  gravity: true,
  day: true,
  brightness: true,
  location: true,
  habitable: true,
  starId: true,
  users: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      emailAddress: true,
    }
  }
};

/**
 * @description This function creates a new planet
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createPlanet = async (req, res) => {
  try {

    // Grab star ID and users from request body
    const {
      starId,
      users = []
    } = req.body;

    // Check if a star exists
    if (starId) {
      const star = await new Repository("Star").findById(starId);
      if (!star) {
        return res.status(404).json({ message: `Star with id ${starId} not found` });
      }
    }

    // Check if a user exists
    if (users.length > 0) {
      for (const id of users) {
        // Find a user by ID
        const user = await new Repository("User").findById(id);

        if (!user) {
          return res.status(404).json({ message: `User with id ${id} was not found` });
        }
      }
    }

    // Create new planet by adding the array of users (if specified)
    const newPlanet = await planetRepository.create({
      ...req.body,
      users: users.length > 0 ? { connect: users.map(id => ({ id })) } : undefined
    });

    // Return the newly created planet as the response object
    const planet = await planetRepository.findById(newPlanet.id, selectObject);

    return res.status(201).json({
      message: "Planet successfully created",
      data: planet,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets all planets
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getPlanets = async (req, res) => {
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
      hasSatellites: req.query.hasSatellites || undefined,
      minTemp: req.query.minTemp || undefined,
      maxTemp: req.query.maxTemp || undefined,
      gravity: req.query.gravity || undefined,
      day: req.query.day || undefined,
      brightness: req.query.brightness || undefined,
      location: req.query.location || undefined,
      habitable: req.query.habitable || undefined,
      starId: req.query.starId || undefined
    }

    // Sort query parameters
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    // Pagination query parameters
    const page = req.query.page
    const amount = req.query.amount

    // Apply filtering, sorting and pagination to planet model
    const planets = await planetRepository.findAll(
      selectObject,
      filters,
      sortBy,
      sortOrder,
      page,
      amount
    );

    if (planets.length === 0) {
      return res.status(404).json({
        message: "No planets found",
        data: planets
      });
    }
    return res.status(200).json({
      count: planets.length,
      data: planets,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function gets a planet by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getPlanet = async (req, res) => {
  try {

    // Find planet by ID
    const planet = await planetRepository.findById(req.params.id, selectObject);

    if (!planet) {
      return res.status(404).json({
        message: `No planet with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: planet,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function updates a planet by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const updatePlanet = async (req, res) => {
  try {
    // Grab star ID and users from request body
    const {
      starId,
      users = []
    } = req.body;

    // Check if a star exists
    if (starId) {
      const star = await new Repository("Star").findById(starId);
      if (!star) {
        return res.status(404).json({ message: `Star with id ${starId} not found` });
      }
    }

    // Check if a user exists
    if (users.length > 0) {
      for (const id of users) {
        // Find a user by ID
        const user = await new Repository("User").findById(id);

        if (!user) {
          return res.status(404).json({ message: `User with id ${id} was not found` });
        }
      }
    }

    // Find a planet by ID
    let planet = await planetRepository.findById(req.params.id);

    if (!planet) {
      return res.status(404).json({
        message: `No planet with the id: ${req.params.id} found`,
      });
    }

    planet = await planetRepository.update(
      req.params.id, 
      { ...req.body, 
        ...(users.length > 0 && { users: { connect: users.map(id => ({ id })) } })
      },
      selectObject
    );

    return res.status(200).json({
      message: `Planet with the id: ${req.params.id} successfully updated`,
      data: planet,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function deletes a planet by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const deletePlanet = async (req, res) => {
  try {

    // Planet to delete
    const planet = await planetRepository.findById(req.params.id);

    if (!planet) {
      return res.status(404).json({
        message: `No planet with the id: ${req.params.id} found`,
      });
    }

    // Any objects that reference a planet
    const children = await advanced.findChildren(["Satellite", "Meteorite", "User"], {
      planetId: planet.id
    });

    if (children.length > 0) {
      return res.status(409).json({
        message: `Planet with the id: ${planet.id} cannot be deleted because it has child objects`,
      });
    }

    await planetRepository.delete(req.params.id);
    return res.json({
      message: `Planet with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * @description This function checks if planets exist and returns just the response headers
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Sends response status
 */
const headPlanets = async (req, res) => {
  try {
    const planets = await planetRepository.findAll();
    if (planets.length === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
};

/**
 * @description This function checks if a planet exists by ID and returns just the response headers
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - Sends response status
 */
const headPlanet = async (req, res) => {
  try {
    const planet = await planetRepository.findById(req.params.id);
    if (!planet) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export {
  createPlanet,
  getPlanets,
  getPlanet,
  updatePlanet,
  deletePlanet,
  headPlanets,
  headPlanet
};
