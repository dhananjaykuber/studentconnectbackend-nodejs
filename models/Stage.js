const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stageSchema = new Schema({
  name: String,
  description: String,
  order: Number,
});

const Stage = mongoose.model('Kanban_Stage', stageSchema);

module.exports = Stage;
