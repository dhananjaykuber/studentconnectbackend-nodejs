const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    title: String,
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Comment', commentSchema);

module.exports = Task;
