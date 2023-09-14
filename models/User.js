const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_name: String,
  profile_image: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
