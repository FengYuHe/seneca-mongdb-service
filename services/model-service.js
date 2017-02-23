const mongoose = require('mongoose');

class ModelService{
  constructor(model) {
    this.Model = mongoose.model(model);
  }

  /**
   * 创建数据
   * @param msg {Object} 优先获取msg.data的数据
   * @param done 回调函数
   * @returns {*|Promise|Promise.<T>}
   */
  create(msg, done){
    const where = msg.data || msg || {};
    return new this.Model(where)
      .save().then((data) => {
        done(null, { success: true, msg: 'create success', data: data });
      })
      .catch(done);
  }
}

module.exports = ModelService;
