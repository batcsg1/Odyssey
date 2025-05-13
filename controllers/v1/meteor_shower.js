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
  comets: true,
  constellationId: true,
  createdAt: true,
  updatedAt: true
};

const createMeteorShower = async (req, res) => {
  try {
    const {
      constellationId,
      comets = [],  // Using comets from the request body
      asteroids = []  // Using asteroids from the request body
    } = req.body;

    // Check if constellation exists
    const constellation = await new Repository("Constellation").findById(constellationId);
    if (!constellation) {
      return res.status(404).json({ message: `The constellation with id ${constellationId} was not found` });
    }

    // Validate each cometId (if comets are provided)
    if (comets.length > 0) {
      for (const id of comets) {
        const comet = await new Repository("Comet").findById(id);
        if (!comet) {
          return res.status(404).json({ message: `Comet with id ${id} was not found` });
        }
      }
    }

    // Validate each asteroidId (if asteroids are provided)
    if (asteroids.length > 0) {
      for (const id of asteroids) {
        const asteroid = await new Repository("Asteroid").findById(id);
        if (!asteroid) {
          return res.status(404).json({ message: `Asteroid with id ${id} was not found` });
        }
      }
    }

    await meteorShowerRepository.create({
      ...req.body,
      comets: comets.length > 0 ? { connect: comets.map(id => ({ id })) } : undefined,
      asteroids: asteroids.length > 0 ? { connect: asteroids.map(id => ({ id })) } : undefined,
    });

    const newMeteorShowers = await meteorShowerRepository.findAll(selectObject);

    return res.status(201).json({
      message: "Meteor shower successfully created",
      data: newMeteorShowers,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMeteorShowers = async (req, res) => {
  try {
    const filters = {
      name: req.query.name || undefined,
      previousYear: req.query.previousYear || undefined,
      nextYear: req.query.nextYear || undefined,
      initialDate: req.query.initialDate || undefined,
      finalDate: req.query.finalDate || undefined,
      frequency: req.query.frequency || undefined,
      duration: req.query.duration || undefined,
      velocity: req.query.velocity || undefined,
      perHour: req.query.perHour || undefined,
      peakDate: req.query.peakDate || undefined,
      constellationId: req.query.constellationId || undefined,
    };

    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const meteorShowers = await meteorShowerRepository.findAll(filters,
      sortBy,
      sortOrder
    );
    
    if (!meteorShowers) {
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
      return res.status(404).json({ message: `No meteor shower with the id: ${req.params.id} found` });
    }
    return res.status(200).json({
      message: `Meteor shower with the id: ${req.params.id} successfully updated`,
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
      return res.status(404).json({ message: `No meteor shower with the id: ${req.params.id} found` });
    }
    await meteorShowerRepository.delete(req.params.id);
    return res.status(200).json({ message: `Meteor shower with the id: ${req.params.id} successfully deleted` });
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
