// Ping++ Server SDK
// 说明：
// 以下代码只是为了方便商户测试而提供的样例代码，商户可根据自己网站需求按照技术文档编写, 并非一定要使用该代码。
// 接入账户系统参考开发者中心：https://www.pingxx.com/docs/server/transfer ，文档可筛选后端语言和接入渠道。
// 该代码仅供学习和研究 Ping++ SDK 使用，仅供参考。

// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = 'app_1Gqj58ynP0mHeX1q';
// 设置 api_key
var pingpp = require('../../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

// 请求参数的 extra 对应各渠道的取值规则请查看 withdrawal_extra 相应方法内说明
var withdrawal_extra = require('./withdrawal_extra');

/**
 * 用户发起余额提现
 */
var order_no = new Date().getTime().toString().substr(0, 10);
var channel = 'unionpay';
var extra = withdrawal_extra(channel);
var params = {
  'user': 'test_user_001',
  'amount': 20, // 金额
  'channel': channel, // 渠道
  'user_fee': 10, // 用户需要承担的手续费
  'order_no': order_no, // 提现订单号，为长度不大于 16 的数字
  'description': 'test232description', // 转账描述
  'extra': extra
};
pingpp.withdrawals.create(APP_ID, params, function(err, data) {
    if (err != null){
      console.log('pingpp.withdrawals.create fail:', err);
    }
    // YOUR CODE
  }
);

/**
 * 查询账户提现列表
 */
pingpp.withdrawals.list(
  APP_ID, // App ID
  { per_page: 3 },
  function(err, data) {
    if (err != null){
      console.log('pingpp.withdrawals.retrieve fail:', err);
    }
    // YOUR CODE
  }
);

/**
 * 查询账户提现
 */
pingpp.withdrawals.retrieve(
  APP_ID, // App ID
  '1701709011052380697', // 提现 ID
  function(err, data) {
    if (err != null){
      console.log('pingpp.withdrawals.retrieve fail:', err);
    }
    // YOUR CODE
  }
);

/**
 * 账户提现撤销
 */
pingpp.withdrawals.cancel(
  APP_ID, // App ID
  '1701709011053327225', // 提现 ID
  function(err, data) {
    if (err != null){
      console.log('pingpp.withdrawals.cancel fail:', err);
    }
    // YOUR CODE
  }
);


/**
 * 账户提现确认
 */
pingpp.withdrawals.confirm(
  APP_ID, // App ID
  '1701709011052380697', // 提现 ID
  function(err, data) {
    if (err != null){
      console.log('pingpp.withdrawals.confirm fail:', err);
    }
    // YOUR CODE
  }
);
