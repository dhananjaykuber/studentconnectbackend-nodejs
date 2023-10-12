const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  description: String,
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'authentication_customuser',
  },
  stage: {
    type: Schema.Types.ObjectId,
    ref: 'kanban_stages',
  },
  assignedTo: [
    {
      type: Schema.Types.ObjectId,
      ref: 'authentication_customuser',
    },
  ],
  dueDate: Date,
  labels: [String],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'authentication_customuser',
      },
      text: String,
      timestamp: Date,
    },
  ],
});

const Task = mongoose.model('Kanban_Task', taskSchema);

module.exports = Task;
