/**
 * @file Manages business logic for meteorites
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const meteoriteRepository = new Repository("Meteorite");

const selectObject = {
  id: true,
  name: true,
  age: true,
  foundYear: true,
  mass: true,
  diameter: true,
  location: true,
  latitude: true,
  longitude: true,
  planetId: true,
  createdAt: true,
  updatedAt: true
};

const createMeteorite = async (req, res) => {
  try {
    // Check if constellationId is provided
    const planetId = req.body.planetId;

    // Check if institution exists
    const planet = await new Repository("Planet").findById(planetId);
    if (!planet) {
      return res.status(404).json({ message: `The planet with id ${planetId} was not found` });
    }

    await meteoriteRepository.create(req.body);
    const newMeteorite = await meteoriteRepository.findAll(selectObject);
    return res.status(201).json({
      message: "Meteorite successfully created",
      data: newMeteorite,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getMeteorites = async (req, res) => {
  try {
    const meteorites = await meteoriteRepository.findAll(selectObject);
    if (!meteorites || meteorites.length === 0) {
      return res.status(404).json({ message: "No meteorites found" });
    }
    return res.status(200).json({
      data: meteorites,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getMeteorite = async (req, res) => {
  try {
    const meteorite = await meteoriteRepository.findById(req.params.id, selectObject);
    if (!meteorite) {
      return res.status(404).json({
        message: `No meteorite with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: meteorite,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateMeteorite = async (req, res) => {
  try {
    let meteorite = await meteoriteRepository.findById(req.params.id);
    if (!meteorite) {
      return res.status(404).json({
        message: `No meteorite with the id: ${req.params.id} found`,
      });
    }

    // Ensure planetId is provided and exists if updating the planet reference
    if (req.body.planetId) {
      meteorite.planetId = req.body.planetId;
    }

    meteorite = await meteoriteRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Meteorite with the id: ${req.params.id} successfully updated`,
      data: meteorite,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteMeteorite = async (req, res) => {
  try {
    const meteorite = await meteoriteRepository.findById(req.params.id);
    if (!meteorite) {
      return res.status(404).json({
        message: `No meteorite with the id: ${req.params.id} found`,
      });
    }
    await meteoriteRepository.delete(req.params.id);
    return res.json({
      message: `Meteorite with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createMeteorite,
  getMeteorites,
  getMeteorite,
  updateMeteorite,
  deleteMeteorite,
};
