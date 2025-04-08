const mongoose = require("mongoose");

// Admin model
const Admin = mongoose.model('Admin', new mongoose.Schema({
    firstname: String,
    password: String, // Store hashed password
  }));

  module.exports = Admin;