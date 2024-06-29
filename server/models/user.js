const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    //maxlength: 10,
    required: true,
  },
  fullName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
