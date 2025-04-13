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
  createdAt: true,
  updatedAt: true
};

const createPlanet = async (req, res) => {
  try {
    const starId = req.body.starId;

    // Check if star exists
    const star = await new Repository("Star").findById(starId);
    if (!star) {
      return res.status(404).json({ message: `Star with id ${starId} not found` });
    }

    await planetRepository.create(req.body);
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
    const planets = await planetRepository.findAll(selectObject);
    if (!planets || planets.length === 0) {
      return res.status(404).json({ message: "No planets found" });
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
