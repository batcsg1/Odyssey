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
  location: true,
  habitable: true,
  planetId: true,
};

const createSatellite = async (req, res) => {
  try {
    await satelliteRepository.create(req.body);
    const newSatellites = await satelliteRepository.findAll(selectObject);
    return res.status(201).json({
      message: "Satellite successfully created",
      data: newSatellites,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getSatellites = async (req, res) => {
  try {
    const satellites = await satelliteRepository.findAll(selectObject);
    if (!satellites || satellites.length === 0) {
      return res.status(404).json({ message: "No satellites found" });
    }
    return res.status(200).json({
      data: satellites,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getSatellite = async (req, res) => {
  try {
    const satellite = await satelliteRepository.findById(req.params.id);
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

const updateSatellite = async (req, res) => {
  try {
    let satellite = await satelliteRepository.findById(req.params.id);
    if (!satellite) {
      return res.status(404).json({
        message: `No satellite with the id: ${req.params.id} found`,
      });
    }
    satellite = await satelliteRepository.update(req.params.id, req.body);
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

const deleteSatellite = async (req, res) => {
  try {
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
