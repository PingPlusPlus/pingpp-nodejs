// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com) -> 点击管理平台右上角公司名称 -> 企业面板 -> 开发参数 -> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com) -> 点击你创建的应用 -> 应用首页 -> 应用 ID(App ID)
var APP_ID = 'app_1Gqj58ynP0mHeX1q';
// 设置 api_key
var pingpp = require('../../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

var channel = 'qpay';

var agreement_extra = require('./agreement_extra');
var extra = agreement_extra.extra(channel);

var contract_no = new Date().getTime().toString();

var params = {
  contract_no: contract_no, // 签约协议号
  app: APP_ID,
  channel: channel, // 签约渠道
  extra: extra, // 对应各渠道的取值规则请查看 agreement_extra 相应方法内说明
  metadata: {} // metadata 元数据
};

/* 签约创建 */
pingpp.agreements.create(params, function(err, agreement) {
  if (err != null) {
    console.log('pingpp.agreements.create failed: ', err);
  } else {
    console.log(agreement);
  }
  // YOUR CODE
});
