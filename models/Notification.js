const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    message: String,
    to: {
      type: Schema.Types.ObjectId,
      ref: 'authentication_customuser',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'kanban_projects',
    },
    from: String,
    message: String,
    task: {
      type: Schema.Types.ObjectId,
      ref: 'kanban_tasks',
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Kanban_Notification', notificationSchema);

module.exports = Notification;
