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
  location: true,
  starId: true,
};

const createComet = async (req, res) => {
  try {
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
    const comets = await cometRepository.findAll(selectObject);
    if (!comets || comets.length === 0) {
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
