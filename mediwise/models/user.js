import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    required:false,
  },
  resetTokenExpires: {
    type: String,
    required: false,
  },
  isVerified: {
     type: Boolean,
      default: false ,
    },

}, { timestamps: true });


const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
