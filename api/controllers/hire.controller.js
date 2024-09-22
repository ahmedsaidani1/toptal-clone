import Hire from '../models/hire.model.js';

// Create a new hire
export const createHire = async (req, res) => {
  try {
    const newHire = new Hire(req.body);
    await newHire.save();
    res.status(201).json(newHire);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
