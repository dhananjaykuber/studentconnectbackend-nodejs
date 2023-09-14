const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  description: String,
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  stage: {
    type: Schema.Types.ObjectId,
    ref: 'Stage',
  },
  assignedTo: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  dueDate: Date,
  labels: [String],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      text: String,
      timestamp: Date,
    },
  ],
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
