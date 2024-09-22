export const test = (req, res) => {
    res.json({ message: 'API is working!' });
  };

  import User from '../models/user.model.js';
  import bcrypt from 'bcryptjs';
  import { errorHandler } from '../utils/error.js';
  
  // Update User Profile
  export const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const updates = req.body;
  
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true }
      );
      if (!updatedUser) {
        return next(errorHandler(404, 'User not found'));
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      next(errorHandler(500, error.message));
    }
  };
  
  // Delete User Account
  export const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
  
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return next(errorHandler(404, 'User not found'));
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      next(errorHandler(500, error.message));
    }
  };
  
  // Sign out User
  export const signoutUser = async (req, res, next) => {
    try {
      res.clearCookie('token');
      res.status(200).json({ message: 'User signed out successfully' });
    } catch (error) {
      next(errorHandler(500, error.message));
    }
  };

  
export async function verifyPassword(req, res) {
  try {
    const { userId, oldPassword } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (isMatch) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
}