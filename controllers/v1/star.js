/**
 * @file Manages business logic for stars
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const starRepository = new Repository("Star");

const selectObject = {
  id: true,
  name: true,
  age: true,
  mass: true,
  diameter: true,
  type: true,
  distance: true,
  temperature: true,
  luminosity: true,
  hasPlanets: true,
  brightness: true,
  rightAscension: true,
  declination: true,
  constellationId: true,
  createdAt: true,
  updatedAt: true
};

const createStar = async (req, res) => {
  try {
    await starRepository.create(req.body);
    const newStars = await starRepository.findAll(selectObject);
    return res.status(201).json({
      message: "Star successfully created",
      data: newStars,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getStars = async (req, res) => {
  try {
    const stars = await starRepository.findAll(selectObject);
    if (!stars || stars.length === 0) {
      return res.status(404).json({ message: "No stars found" });
    }
    return res.status(200).json({
      data: stars,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getStar = async (req, res) => {
  try {
    const star = await starRepository.findById(req.params.id);
    if (!star) {
      return res.status(404).json({
        message: `No star with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: star,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateStar = async (req, res) => {
  try {
    let star = await starRepository.findById(req.params.id);
    if (!star) {
      return res.status(404).json({
        message: `No star with the id: ${req.params.id} found`,
      });
    }
    star = await starRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Star with the id: ${req.params.id} successfully updated`,
      data: star,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteStar = async (req, res) => {
  try {
    const star = await starRepository.findById(req.params.id);
    if (!star) {
      return res.status(404).json({
        message: `No star with the id: ${req.params.id} found`,
      });
    }
    await starRepository.delete(req.params.id);
    return res.json({
      message: `Star with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createStar,
  getStars,
  getStar,
  updateStar,
  deleteStar,
};
