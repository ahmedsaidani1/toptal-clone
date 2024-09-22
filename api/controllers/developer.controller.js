import Developer from '../models/developer.model.js';

export const createDeveloper = async (req, res, next) => {
  try {
    const { name, specialty } = req.body;
    const newDeveloper = new Developer({ name, specialty });
    await newDeveloper.save();
    res.status(201).json(newDeveloper);
  } catch (err) {
    next(err);
  }
};

export const getDevelopers = async (req, res, next) => {
  try {
    const developers = await Developer.find();
    res.status(200).json(developers);
  } catch (err) {
    next(err);
  }
};
