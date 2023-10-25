const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  description: String,
  projectId: String,
  projectUrl: String,
  lead: {
    type: Schema.Types.ObjectId,
    ref: 'authentication_customuser',
  },
  stages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'kanban_stages',
    },
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'authentication_customuser',
    },
  ],
});

const Project = mongoose.model('Kanban_Project', projectSchema);

module.exports = Project;
