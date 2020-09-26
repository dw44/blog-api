const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  postBody: {
    type: String,
    required: true,
  },
  postedOn: {
    type: Date,
    default: new Date(),
    required: true
  },
  lastEdited: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model('Post', PostSchema);