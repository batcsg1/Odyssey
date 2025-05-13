/**
 * @file Manages business logic for comets
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

// Create a repository for the Comet model
const cometRepository = new Repository("Comet");

const selectObject = {
  id: true,
  name: true,
  mass: true,
  diameter: true,
  density: true,
  type: true,
  year: true,
  perigee: true,
  apogee: true,
  brightness: true,
  location: true,
  starId: true,
  createdAt: true,
  updatedAt: true
};

const createComet = async (req, res) => {
  try {
    const starId = req.body.starId;

    // Check if star exists
    const star = await new Repository("Star").findById(starId);
    if (!star) {
      return res.status(404).json({ message: `Star with id ${starId} not found` });
    }

    await cometRepository.create(req.body);
    const newComets = await cometRepository.findAll(selectObject);
    return res.status(201).json({
      message: "Comet successfully created",
      data: newComets,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getComets = async (req, res) => {
  try {
    const filters = {
      id: req.query.id || undefined,
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

    const comets = await cometRepository.findAll(filters,
      sortBy,
      sortOrder);
      
    if (!comets) {
      return res.status(404).json({ message: "No comets found" });
    }
    return res.status(200).json({
      data: comets,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getComet = async (req, res) => {
  try {
    const comet = await cometRepository.findById(req.params.id);
    if (!comet) {
      return res.status(404).json({
        message: `No comet with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: comet,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateComet = async (req, res) => {
  try {
    let comet = await cometRepository.findById(req.params.id);
    if (!comet) {
      return res.status(404).json({
        message: `No comet with the id: ${req.params.id} found`,
      });
    }
    comet = await cometRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Comet with the id: ${req.params.id} successfully updated`,
      data: comet,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteComet = async (req, res) => {
  try {
    const comet = await cometRepository.findById(req.params.id);
    if (!comet) {
      return res.status(404).json({
        message: `No comet with the id: ${req.params.id} found`,
      });
    }
    await cometRepository.delete(req.params.id);
    return res.json({
      message: `Comet with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createComet,
  getComets,
  getComet,
  updateComet,
  deleteComet,
};
