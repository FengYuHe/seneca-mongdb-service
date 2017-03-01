const mongoose = require('mongoose');

class ModelService{
  constructor(model) {
    this.Model = mongoose.model(model);
  }

  /**
   * 创建数据
   * @param msg {Object} 优先获取msg.data的数据
   * @param done 成功回调
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

  /**
   * 更新数据
   * @param msg {Object} 优先获取msg.data的数据
   * @param done 成功回调
   * @return {*|Promise|Promise.<T>}
   */
  update(msg, done){
    const where = msg.data || msg || {};
    const id = where.id || where._id || msg.id;
    delete where.id;
    delete where._id;
    return this.Model.findByIdAndUpdate(id, { $set: where }, { new: true }).then((result) => {
      if (!result) {
        return done(null, { success: false, msg: 'not found' });
      }
      return done(null, { success: true, msg: 'update success', data: result });
    }).catch(done);
  }

  /**
   * 删除数据
   * @param msg {Object} 从中获取id
   * @param done 成功回调
   * @return {Promise|*|Promise.<TResult>|MPromise}
   */
  delete(msg, done){
    const id = msg.id || msg._id || (msg.data && msg.data.id);
    return this.Model.findByIdAndRemove(id).then((result) => {
      return done(null, { success: true, msg: 'delete success', data: result });
    }).catch(done);
  }

  /**
   * 获取数据条数
   * @param msg
   * @param done
   * @return {*|Promise|Promise.<T>}
   */
  count(msg, done){
    const filters = (msg.data && msg.data.filters) || msg.filters || {};
    return this.Model
      .count(filters)
      .then(result => done(null, { success: true, msg: 'get count success', data: result }))
      .catch(done);
  }

  /**
   * 根据id获取单条数据
   * @param msg
   * @param done
   * @return {*|Promise|Promise.<T>}
   */
  findById(msg, done) {
    const id = msg.id || msg._id || (msg.data && msg.data.id);
    return this.Model.findById(id).then((result) => {
      if (!result) {
        return done(null, { success: false, msg: 'not found' });
      }
      return done(null, { success: true, data: result });
    }).catch(done);
  }

  /**
   * 获取数据列表，分页查询
   * @param msg
   *  * data {Object} 具体数据
   *   * filters {Object} 过滤条件
   *   * sort {Object} 排序条件
   *   * skip {Number} 跳过多少条数据
   *   * limit {Number} 返回多少条数据
   * @param done
   * @return {*|Promise|Promise.<T>}
   */
  find(msg, done) {
    const data = msg.data || {};
    const filters = data.filters || {};
    const sort = data.sort || {};
    const skip = data.skip || 0;
    const limit = data.limit || 20;
    return this.Model
      .find(filters)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .then(result => done(null, { success: true, msg: 'get list success', data: result }))
      .catch(done);
  }

  /**
   * 根据id检查当前数据是否存在
   * @param msg
   * @param done
   * @return {Promise|*|Promise.<T>}
   */
  exists(msg, done) {
    const id = msg.id || msg._id || (msg.data && msg.data.id);
    return this.Model.findById(id).then((result) => {
      if (!result) {
        return done(null, { success: true, data: { exists: false } });
      }
      return done(null, { success: true, data: { exists: true } });
    }).catch(done);
  }
}

module.exports = ModelService;
