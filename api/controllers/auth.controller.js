import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import axios from 'axios';
import passport from 'passport';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';

export const signup = async (req, res, next) => {
  const { firstName, lastName, phone, email, password } = req.body;

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !password ||
    firstName === '' ||
    lastName === '' ||
    phone === '' ||
    email === '' ||
    password === ''
  ) {
    return next(errorHandler(400, 'All fields are required!'));
  }

  try {
    // Generate a salt and hash the password with the salt
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate a token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
    );

    const { password: pass, ...rest } = newUser._doc;

    res
      .status(201)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({ ...rest, token, message: 'Signup successful' });
  } catch (error) {
    next(error);
  }
};


export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id},
      process.env.JWT_SECRET,
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({ ...rest, token });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id},
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};




passport.use(new LinkedInStrategy({
  clientID: '773je8r9ihv05c',
  clientSecret: '9GPg79vMoikwYNPU',
  callbackURL: "http://localhost:5173/api/auth/linkedin/callback",
  scope: [
    "openid",
    "profile",
    "email"
],
}, async (accessToken, refreshToken, profile, done) => {
  const { emails, displayName, photos } = profile;
  const email = emails[0].value;
  const name = displayName;
  const linkedinPhotoUrl = photos[0].value;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      user = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: linkedinPhotoUrl,
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );
    const { password, ...rest } = user._doc;

    done(null, { ...rest, token });
  } catch (error) {
    done(error, null);
  }
}));

export const linkedin = passport.authenticate('linkedin', {
  state: true,
  session: false,
});

export const linkedinCallback = (req, res, next) => {
  passport.authenticate('linkedin', (err, user, info) => {
    if (err) return next(err);
    res
      .status(200)
      .cookie('access_token', user.token, {
        httpOnly: true,
      })
      .json(user);
  })(req, res, next);
};



export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  
  if (!email || email === '') {
    return next(errorHandler(400, 'Email is required'));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    // Send email
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    

    // Configure Nodemailer to use Gmail with app password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: message,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, data: 'Password reset email sent' });

  } catch (error) {
    console.log('error', error);
    next(errorHandler(500, 'Email could not be sent'));
  }
};

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(errorHandler(400, 'Invalid token or token has expired'));
    }

    user.password = bcryptjs.hashSync(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, data: 'Password reset successful' });

  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res) => {
  const { oldPassword, newPassword, ...otherUpdates } = req.body;
  
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);

    // Verify the old password if a new password is provided
    if (newPassword) {
      const isMatch = await bcryptjs.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' });
      }

      // Hash the new password and update it
      const salt = await bcryptjs.genSalt(10);
      const hashedNewPassword = await bcryptjs.hash(newPassword, salt);
      user.password = hashedNewPassword;
    }

    // Update other fields
    Object.assign(user, otherUpdates);
    await user.save();

    res.json({ message: 'User profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCompanyInfo = async (req, res, next) => {
  const { companyName, companySize, companyLinkedIn } = req.body;
  const { userId } = req.params;
  
  if (!companyName || !companySize || !companyLinkedIn) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    user.companyName = companyName;
    user.companySize = companySize;
    user.companyLinkedIn = companyLinkedIn;
    user.companyInfoCompleted = true;
    await user.save();

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const sendFeedback = async (req, res, next) => {
  const { fullName, title, message } = req.body;
  const { userId } = req.params;  
  
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    const email = user.email; // Utiliser l'email de l'utilisateur connecté

  if (!fullName || !title || !message) {
    return next(errorHandler(400, 'All fields are required'));
  }

  const feedbackMessage = `
    <h3>New Feedback Received</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Title:</strong> ${title}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email, // Utilisateur's email
    to: process.env.GMAIL_USER, // Votre email
    subject: `Feedback: ${title}`,
    html: feedbackMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, data: 'Feedback sent successfully' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    next(errorHandler(500, 'Feedback could not be sent'));
  }
};