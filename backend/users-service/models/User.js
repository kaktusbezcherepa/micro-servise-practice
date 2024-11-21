const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    number: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10,15}$/,
    },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    role: {
      type: String,
      default: 'customer',
      enum: ['admin', 'customer'], 
    },
  },
  { timestamps: true } 
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
