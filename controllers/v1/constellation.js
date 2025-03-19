/**
 * @file Manages business logic for constellations
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const constellationRepository = new Repository("Constellation");

const selectObject = {
  id: true,
  name: true,
  right_ascension: true,
  declination: true,
  shape: true,
  area: true
};

const createConstellation = async (req, res) => {
  try {
    await constellationRepository.create(req.body);
    const newConstellations = await constellationRepository.findAll(selectObject);
    return res.status(201).json({
      message: "Constellation successfully created",
      data: newConstellations,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getConstellations = async (req, res) => {
  try {
    const constellations = await constellationRepository.findAll(selectObject);
    if (!constellations) {
      return res.status(404).json({ message: "No constellations found" });
    }
    return res.status(200).json({
      data: constellations,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getConstellation = async (req, res) => {
  try {
    const constellation = await constellationRepository.findById(req.params.id);
    if (!constellation) {
      return res.status(404).json({
        message: `No constellation with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: constellation,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateConstellation = async (req, res) => {
  try {
    let constellation = await constellationRepository.findById(req.params.id);
    if (!constellation) {
      return res.status(404).json({
        message: `No constellation with the id: ${req.params.id} found`,
      });
    }
    constellation = await constellationRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Constellation with the id: ${req.params.id} successfully updated`,
      data: constellation,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteConstellation = async (req, res) => {
  try {
    const constellation = await constellationRepository.findById(req.params.id);
    if (!constellation) {
      return res.status(404).json({
        message: `No constellation with the id: ${req.params.id} found`,
      });
    }
    await constellationRepository.delete(req.params.id);
    return res.json({
      message: `Constellation with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createConstellation,
  getConstellations,
  getConstellation,
  updateConstellation,
  deleteConstellation,
};
