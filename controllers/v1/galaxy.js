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

const createGalaxy = async (req, res) => {
  try {
    await galaxyRepository.create(req.body);
    const newGalaxies = await galaxyRepository.findAll(selectObject);
    return res.status(201).json({
      message: "Galaxy successfully created",
      data: newGalaxies,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getGalaxies = async (req, res) => {
  try {
    const filters = {
      name: req.query.name || undefined, 
      type: req.query.type || undefined,
      distance: req.query.distance || undefined,
      size: req.query.size || undefined,
      brightness: req.query.brightness || undefined,
      constellationId: req.query.constellationId || undefined
    }

    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const galaxies = await galaxyRepository.findAll(
      filters,
      sortBy,
      sortOrder
    );
    
    if (!galaxies) {
      return res.status(404).json({ message: "No galaxies found" });
    }
    return res.status(200).json({
      data: galaxies,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getGalaxy = async (req, res) => {
  try {
    const galaxy = await galaxyRepository.findById(req.params.id);
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

const updateGalaxy = async (req, res) => {
  try {
    let galaxy = await galaxyRepository.findById(req.params.id);
    if (!galaxy) {
      return res.status(404).json({
        message: `No galaxy with the id: ${req.params.id} found`,
      });
    }
    galaxy = await galaxyRepository.update(req.params.id, req.body);
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

const deleteGalaxy = async (req, res) => {
  try {
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
