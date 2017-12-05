// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = 'app_1Gqj58ynP0mHeX1q';
// 设置 api_key
var pingpp = require('../../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

/**
 * 创建余额转账 balance_transfer
 */
var order_no = new Date().getTime().toString().substr(0, 10);
var params_create = {
  'user': 'test_user_001',  // 发起转账的用户 ID（可以是 customer 或 business，但不能填 0）必传
  'recipient': 'test_user_003',  // 接收转账的用户 ID（可以是 customer 或 business，可以为 0）必传
  'order_no': order_no,  // 商户订单号，必须在商户系统内唯一  必传
  'user_fee': 0, // 向发起转账的用户额外收取的手续费，单位：分 可选
  'amount': 1, // 用户收到转账的余额，单位：分  必传
  'description': 'Balance transfer description.' // 描述 可选
};
pingpp.balanceTransfers.create(APP_ID, params_create, function(err, balanceTransfer) {
  if (err != null){
    console.log('pingpp.balanceTransfers.list fail:', err);
  }
  // YOUR CODE
});

/**
 * 查询单个余额转账 balance_transfer
 */
pingpp.balanceTransfers.retrieve(APP_ID,
  '660170829413280122880001', // BalanceTransfers ID
  function(err, balanceTransfer) {
    if (err != null){
      console.log('pingpp.balanceTransfers.retrieve fail:', err);
    }
    // YOUR CODE
});

/**
 * 查询余额转账 balance_transfer 列表
 */
var params_list = {
  'page': 1,
  'per_page': 3
};
pingpp.balanceTransfers.list(APP_ID, params_list, function(err, data) {
  if (err != null){
    console.log('pingpp.balanceTransfers.list fail:', err);
  }
  // YOUR CODE
});


