// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = 'app_1Gqj58ynP0mHeX1q';
// 设置 api_key
var pingpp = require('../../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

/**
 * 创建分润结算对象
 */
pingpp.royaltySettlements.create(
  {
    'payer_app': APP_ID,       // 分润发起方所在应用的 id, 必传
    'method': 'unionpay',     // 分润的方式，余额 balance 或渠道名称，例如 alipay, 必传
    'recipient_app': APP_ID,  // 分润接收方的应用 id，即分润用户关联的应用 id。可选
    'is_preview': false,      // 是否预览，选择预览不会真实创建分润结算对象，也不会修改分润对象的状态, 可选
    'created': {
      'gt': 1488211200,
      'lte': 1488297600
    }
  },
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);

/**
 * 查询分润结算对象列表
 */
pingpp.royaltySettlements.list(
  {
    payer_app: APP_ID, // payer_app 必传
    page: 1,
    per_page: 3
  },
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);

/**
 * 查询分润结算对象
 */
pingpp.royaltySettlements.retrieve(
  '431170401120500001', // royaltySettlements ID
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);

/**
 * 取消分润结算对象
 */
pingpp.royaltySettlements.cancel(
  '431170401120500001', // royaltySettlements ID
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);

/**
 * 更新分润结算对象
 */
pingpp.royaltySettlements.update(
  '431170401120500001', // royaltySettlements ID
  {'status': 'canceled'}, // 需要更新的状态  [pending, canceled]
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);
