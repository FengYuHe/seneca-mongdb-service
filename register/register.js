const nconf = require('nconf');
const fs = require('fs');

const Service = require('../services/model-service');
const role = nconf.get('role');
const refsCmd = ['create'];

module.exports = function register() {
  const models = fs.readdirSync('./models/');
  // 获取模型
  models.forEach((item) => {
    const model = item.split('.js')[0].replace(/-/g, '_');
    const service = new Service(model);
    // 拼接cmd，格式为model + '_' + cmd
    const cmdList = refsCmd.map((cmd) => {
      return `${model}_${cmd}`;
    });
    for (let i = 0; i < cmdList.length; i++) {
      this.add(`role:${role}, cmd:${cmdList[i]}`, (msg, done) => {
        service[refsCmd[i]](msg, done);
      });
    }
  })
};
