const mongoose = require('mongoose');

const userSchema = require("../schemas/userSchema");

const User = mongoose.model('my_user', userSchema)

module.exports = User;

