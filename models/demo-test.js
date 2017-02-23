const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const DemoTestSchema = new Schema({
  name: String,
  type: Number,
  test: Boolean
});

// 模块名带横杠替换成下划线
module.exports = mongoose.model('demo_test', DemoTestSchema);