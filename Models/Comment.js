const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  commentBody: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  postedOn: {
    type: Date,
    default: new Date(),
    required: true
  }
});

module.exports = mongoose.model('Comment', CommentSchema);