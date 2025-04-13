/**
 * @file Manages business logic for meteor showers
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const meteorShowerRepository = new Repository("MeteorShower");

const selectObject = {
  id: true,
  name: true,
  previousYear: true,
  nextYear: true,
  initialDate: true,
  finalDate: true,
  frequency: true,
  duration: true,
  velocity: true,
  perHour: true,
  peakDate: true,
  cometId: true,
  asteroidId: true,
  constellationId: true,
  createdAt: true,
  updatedAt: true
};

const createMeteorShower = async (req, res) => {
  try {
    const cometId = req.body.cometId;

    // Check if comet exists
    const comet = await new Repository("Comet").findById(cometId);
    if (!comet) {
      return res.status(404).json({ message: `Comet with id ${cometId} not found` });
    }

    const asteroidId = req.body.asteroidId;

    // Check if asteroid exists
    const asteroid = await new Repository("Asteroid").findById(asteroidId);
    if (!asteroid) {
      return res.status(404).json({ message: `Asteroid with id ${asteroidId} not found` });
    }

    const newMeteorShower = await meteorShowerRepository.create(req.body);
    return res.status(201).json({
      message: "Meteor shower successfully created",
      data: newMeteorShower,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMeteorShowers = async (req, res) => {
  try {
    const meteorShowers = await meteorShowerRepository.findAll(selectObject);
    if (!meteorShowers || meteorShowers.length === 0) {
      return res.status(404).json({ message: "No meteor showers found" });
    }
    return res.status(200).json({ data: meteorShowers });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMeteorShower = async (req, res) => {
  try {
    const meteorShower = await meteorShowerRepository.findById(req.params.id, selectObject);
    if (!meteorShower) {
      return res.status(404).json({ message: `No meteor shower with id: ${req.params.id} found` });
    }
    return res.status(200).json({ data: meteorShower });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateMeteorShower = async (req, res) => {
  try {
    const meteorShower = await meteorShowerRepository.update(req.params.id, req.body);
    if (!meteorShower) {
      return res.status(404).json({ message: `No meteor shower with id: ${req.params.id} found` });
    }
    return res.status(200).json({
      message: `Meteor shower with id: ${req.params.id} successfully updated`,
      data: meteorShower,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteMeteorShower = async (req, res) => {
  try {
    const meteorShower = await meteorShowerRepository.findById(req.params.id);
    if (!meteorShower) {
      return res.status(404).json({ message: `No meteor shower with id: ${req.params.id} found` });
    }
    await meteorShowerRepository.delete(req.params.id);
    return res.status(200).json({ message: `Meteor shower with id: ${req.params.id} successfully deleted` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createMeteorShower,
  getMeteorShowers,
  getMeteorShower,
  updateMeteorShower,
  deleteMeteorShower,
};
