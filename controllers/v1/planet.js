/**
 * @file Manages business logic for planets
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const planetRepository = new Repository("Planet");

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
  },
  createdAt: true,
  updatedAt: true
};

const createPlanet = async (req, res) => {
  try {
    const {
      starId,
      users = [],  // Using comets from the request body
    } = req.body;

    // Check if star exists
    const star = await new Repository("Star").findById(starId);
    if (!star) {
      return res.status(404).json({ message: `Star with id ${starId} not found` });
    }

    // Validate each cometId (if comets are provided)
    if (users.length > 0) {
      for (const id of users) {
        const user = await new Repository("User").findById(id);
        if (!user) {
          return res.status(404).json({ message: `User with id ${id} was not found` });
        }
      }
    }

    const newPlanet = await planetRepository.create({
      ...req.body,
      users: users.length > 0 ? { connect: users.map(id => ({ id })) } : undefined
    });

    const newPlanets = await planetRepository.findAll(selectObject);

    return res.status(201).json({
      message: "Planet successfully created",
      data: newPlanets,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getPlanets = async (req, res) => {
  try {
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
    
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const planets = await planetRepository.findAll(
      selectObject,
      filters,
      sortBy,
      sortOrder
    );

    if (planets.length === 0) {
      return res.status(404).json({ 
        message: "No planets found",
        data: planets
      });
    }
    return res.status(200).json({
      data: planets,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getPlanet = async (req, res) => {
  try {
    const planet = await planetRepository.findById(req.params.id);
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

const updatePlanet = async (req, res) => {
  try {
    let planet = await planetRepository.findById(req.params.id);
    if (!planet) {
      return res.status(404).json({
        message: `No planet with the id: ${req.params.id} found`,
      });
    }
    planet = await planetRepository.update(req.params.id, req.body);
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

const deletePlanet = async (req, res) => {
  try {
    const planet = await planetRepository.findById(req.params.id);
    if (!planet) {
      return res.status(404).json({
        message: `No planet with the id: ${req.params.id} found`,
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

export {
  createPlanet,
  getPlanets,
  getPlanet,
  updatePlanet,
  deletePlanet,
};
