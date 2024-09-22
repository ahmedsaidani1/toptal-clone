import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  { 
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profilePicture:{
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    companyName: String,
    companySize: String,
    companyLinkedIn: String,
    companyInfoCompleted: {
      type: Boolean,
      default: false,
    },
    },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
