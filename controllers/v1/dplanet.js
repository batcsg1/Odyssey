/**
 * @file Manages business logic for dwarf planets
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const dwarfPlanetRepository = new Repository("DwarfPlanet");

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
  location: true,
  habitable: true,
  starId: true,
};

const createDwarfPlanet = async (req, res) => {
  try {
    await dwarfPlanetRepository.create(req.body);
    const newDwarfPlanets = await dwarfPlanetRepository.findAll(selectObject);
    return res.status(201).json({
      message: "Dwarf planet successfully created",
      data: newDwarfPlanets,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getDwarfPlanets = async (req, res) => {
  try {
    const dwarfPlanets = await dwarfPlanetRepository.findAll(selectObject);
    if (!dwarfPlanets || dwarfPlanets.length === 0) {
      return res.status(404).json({ message: "No dwarf planets found" });
    }
    return res.status(200).json({
      data: dwarfPlanets,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getDwarfPlanet = async (req, res) => {
  try {
    const dwarfPlanet = await dwarfPlanetRepository.findById(req.params.id);
    if (!dwarfPlanet) {
      return res.status(404).json({
        message: `No dwarf planet with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: dwarfPlanet,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateDwarfPlanet = async (req, res) => {
  try {
    let dwarfPlanet = await dwarfPlanetRepository.findById(req.params.id);
    if (!dwarfPlanet) {
      return res.status(404).json({
        message: `No dwarf planet with the id: ${req.params.id} found`,
      });
    }
    dwarfPlanet = await dwarfPlanetRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Dwarf planet with the id: ${req.params.id} successfully updated`,
      data: dwarfPlanet,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteDwarfPlanet = async (req, res) => {
  try {
    const dwarfPlanet = await dwarfPlanetRepository.findById(req.params.id);
    if (!dwarfPlanet) {
      return res.status(404).json({
        message: `No dwarf planet with the id: ${req.params.id} found`,
      });
    }
    await dwarfPlanetRepository.delete(req.params.id);
    return res.json({
      message: `Dwarf planet with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createDwarfPlanet,
  getDwarfPlanets,
  getDwarfPlanet,
  updateDwarfPlanet,
  deleteDwarfPlanet,
};
