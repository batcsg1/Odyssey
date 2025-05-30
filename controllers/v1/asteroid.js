/**
 * @file Manages business logic for asteroids
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const asteroidRepository = new Repository("Asteroid");

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
  location: true,
  brightness: true,
  starId: true,
  createdAt: true,
  updatedAt: true
};

const createAsteroid = async (req, res) => {
  try {
    const starId = req.body.starId;

    // Check if star exists
    const star = await new Repository("Star").findById(starId);
    if (!star) {
      return res.status(404).json({ message: `Star with id ${starId} not found` });
    }
    
    const newAsteroid = await asteroidRepository.create(req.body);

    const asteroid = await asteroidRepository.findById(newAsteroid.id, selectObject);

    return res.status(201).json({
      message: "Asteroid successfully created",
      data: asteroid,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAsteroids = async (req, res) => {
  try {
    const filters = {
      name: req.query.name || undefined,
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

    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";
    const page = req.query.page
    const amount = req.query.amount

    const asteroids = await asteroidRepository.findAll(
      selectObject,
      filters,
      sortBy,
      sortOrder,
      page,
      amount
    );

    if (asteroids.length === 0) {
      return res.status(404).json({ 
        message: "No asteroids found",
        data: asteroids
       });
    }
    return res.status(200).json({ data: asteroids });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAsteroid = async (req, res) => {
  try {
    const asteroid = await asteroidRepository.findById(req.params.id, selectObject);
    if (!asteroid) {
      return res.status(404).json({ message: `No asteroid with id: ${req.params.id} found` });
    }
    return res.status(200).json({ data: asteroid });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateAsteroid = async (req, res) => {
  try {
    const asteroid = await asteroidRepository.update(req.params.id, req.body);
    if (!asteroid) {
      return res.status(404).json({ message: `No asteroid with id: ${req.params.id} found` });
    }
    return res.status(200).json({
      message: `Asteroid with the id: ${req.params.id} successfully updated`,
      data: asteroid,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteAsteroid = async (req, res) => {
  try {
    const asteroid = await asteroidRepository.findById(req.params.id);
    if (!asteroid) {
      return res.status(404).json({ message: `No asteroid with id: ${req.params.id} found` });
    }
    await asteroidRepository.delete(req.params.id);
    return res.status(200).json({ message: `Asteroid with the id: ${req.params.id} successfully deleted` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createAsteroid,
  getAsteroids,
  getAsteroid,
  updateAsteroid,
  deleteAsteroid,
};