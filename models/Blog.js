const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: String,
    description: String,
    categories: [String],
    banner: String,
    bannerRef: String,
    bannerType: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'authentication_customuser',
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Blog', blogSchema);

module.exports = Task;
