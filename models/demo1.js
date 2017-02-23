const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Demo1Schema = new Schema({
  name: String,
  type: Number,
  demo1: Boolean
});

// 暴露出跟文件名一致的模块名
module.exports = mongoose.model('demo1', Demo1Schema);