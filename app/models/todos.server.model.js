// Required in /app/config/mongoose.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: "Please enter a To Do item"
  },
  comment: {
    type: String,
    default: '',
    trim: true
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  completed: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Todo', TodoSchema);