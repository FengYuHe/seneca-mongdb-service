const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Demo2Schema = new Schema({
  name: String,
  type: Number,
  demo2: Boolean
});

module.exports = mongoose.model('demo2', Demo2Schema);