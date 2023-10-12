const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    last_login: {
      type: Date,
      default: null,
    },
    user_id: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      maxLength: 120,
      default: null,
    },
    email: {
      type: String,
      required: true,
    },
    is_email_validated: {
      type: Boolean,
      default: false,
    },
    is_temp_password: {
      type: Boolean,
      default: false,
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    is_staff: {
      type: Boolean,
      default: false,
    },
    created_on: {
      type: Date,
      required: true,
    },
    account_type: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'superuser'],
    },
  },
  {
    collection: 'authentication_customuser',
  }
);

const UserModel = mongoose.model('authentication_customuser', userSchema);

module.exports = UserModel;
