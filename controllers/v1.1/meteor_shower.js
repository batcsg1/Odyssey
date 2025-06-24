/**
 * @file Manages business logic for meteor showers
 * @author Samuel Batchelor
 */

import advancedRepository from "../../repositories/advanced.js";
import Repository from "../../repositories/generic.js";

const meteorShowerRepository = new Repository("MeteorShower");
const advanced = new advancedRepository("MeteorShower");

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
  comets: {
    select: {
      id: true,
      name: true
    }
  },
  constellationId: true,
  createdAt: true,
  updatedAt: true
};

/**
 * @description This function creates a new meteor shower
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createMeteorShower = async (req, res) => {
  try {
    const {
      constellationId,
      comets = [],  // Using comets from the request body
      asteroids = [],  // Using asteroids from the request body
      initialDate,
      finalDate,
      peakDate
    } = req.body;

    function isDateValid(dateStr) {
      const parsedDateStr = String(dateStr);
      const date = new Date(parsedDateStr)
      return !isNaN(date.getTime()) ? date : null;
    }

    // Check if constellation exists
    if (constellationId) {
      const constellation = await new Repository("Constellation").findById(constellationId);
      if (!constellation) {
        return res.status(404).json({ message: `The constellation with id ${constellationId} was not found` });
      }
      // Find if a meteor shower is already part of a particular constellation
      const existingMeteorShower = await advanced.findOneByForeignKey("MeteorShower", "constellationId", constellationId);
      if (existingMeteorShower) {
        return res.status(409).json({ message: `There is already a meteor shower that belongs to constellation with ${constellationId}` });
      }
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

    // Create new meteor shower
    const newMeteorShower = await meteorShowerRepository.create({
      ...req.body,
      initialDate: isDateValid(initialDate),
      finalDate: isDateValid(finalDate),
      peakDate: isDateValid(peakDate),
      comets: comets.length > 0 ? { connect: comets.map(id => ({ id })) } : undefined,
      asteroids: asteroids.length > 0 ? { connect: asteroids.map(id => ({ id })) } : undefined,
    });

    // Return the newly created meteor shower as the response object
    const meteorShower = await meteorShowerRepository.findById(newMeteorShower.id, selectObject);

    return res.status(201).json({
      message: "Meteor shower successfully created",
      data: meteorShower,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * @description This function gets all meteor showers
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getMeteorShowers = async (req, res) => {
  try {
    // Filtering query parameters
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

    // Sort query parameters
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    // Pagination query parameters
    const page = req.query.page
    const amount = req.query.amount

    // Apply filtering, sorting and pagination to meteor shower model
    const meteorShowers = await meteorShowerRepository.findAll(
      selectObject,
      filters,
      sortBy,
      sortOrder,
      page,
      amount
    );

    if (meteorShowers.length === 0) {
      return res.status(404).json({
        message: "No meteor showers found",
        data: meteorShowers
      });
    }

    return res.status(200).json({
      count: meteorShowers.length,
      data: meteorShowers
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * @description This function gets a meteor shower by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getMeteorShower = async (req, res) => {
  try {

    // Find a meteor shower by ID
    const meteorShower = await meteorShowerRepository.findById(req.params.id, selectObject);

    if (!meteorShower) {
      return res.status(404).json({ message: `No meteor shower with id: ${req.params.id} found` });
    }
    return res.status(200).json({ data: meteorShower });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * @description This function updates a meteor shower by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const updateMeteorShower = async (req, res) => {
  try {
    const {
      constellationId,
      comets = [],  // Using comets from the request body
      asteroids = [],  // Using asteroids from the request body
      initialDate,
      finalDate,
      peakDate
    } = req.body;

    function isDateValid(dateStr) {
      const parsedDateStr = String(dateStr);
      const date = new Date(parsedDateStr)
      return !isNaN(date.getTime()) ? date : null;
    }

    // Check if constellation exists
    if (constellationId) {

      const constellation = await new Repository("Constellation").findById(constellationId);

      if (!constellation) {
        return res.status(404).json({ message: `The constellation with id ${constellationId} was not found` });
      }

      // Find if a meteor shower is already part of a particular constellation
      const existingMeteorShower = await advanced.findOneByForeignKey("MeteorShower", "constellationId", constellationId);

      // If meteor shower is part of a constellation and is not the one being currently updated
      if (existingMeteorShower && existingMeteorShower.id !== req.params.id) {
        return res.status(409).json({ message: `There is already a meteor shower that belongs to constellation with ${constellationId}` });
      }
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

    // Meteor shower to be updated
    let meteorShower = await meteorShowerRepository.update(
      req.params.id,
      {
        ...req.body,
        ...(initialDate && isDateValid(initialDate) && { initialDate: isDateValid(initialDate) }),
        ...(finalDate && isDateValid(finalDate) && { finalDate: isDateValid(finalDate) }),
        ...(peakDate && isDateValid(peakDate) && { peakDate: isDateValid(peakDate) }),
        ...(comets.length > 0 && { comets: { connect: comets.map(id => ({ id })) } }),
        ...(asteroids.length > 0 && { asteroids: { connect: asteroids.map(id => ({ id })) } }),
      },
      selectObject
    );

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

/**
 * @description This function deletes a meteor shower by ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const deleteMeteorShower = async (req, res) => {
  try {

    // Meteor shower to delete
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
