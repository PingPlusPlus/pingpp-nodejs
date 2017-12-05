// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = 'app_1Gqj58ynP0mHeX1q';
// 设置 api_key
var pingpp = require('../../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

/**
 * 配置 sub_app 渠道参数
 */
pingpp.subApps.createChannel(
  APP_ID,
  'app_rbDmXLHmLqbTLKm9',   // SUB_APP_ID
  {
    'channel': 'bfb',
    'params': {
      'fee_rate': 60,
      'bfb_sp': '1600200213',
      'bfb_key': 'A9lUEVtdrrQobDHgzkzM2rThSNpXVELt'
    },
    'description': 'Your description'
  }, function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
    console.log(data);
  }
);

/**
 * 查询 sub_app 渠道参数
 */
pingpp.subApps.retrieveChannel(
  APP_ID,
  'app_rbDmXLHmLqbTLKm9', //  sub_app ID
  'bfb', // 渠道名字
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);

/**
 * 更新 sub_app 渠道参数
 */
pingpp.subApps.updateChannel(
  APP_ID,
  'app_rbDmXLHmLqbTLKm9', // sub_app ID
  'bfb', // 渠道名字
  {
    'description': 'New description'
  }, function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);

/**
 * 删除 sub_app 渠道参数
 */
pingpp.subApps.deleteChannel(
  APP_ID,
  'app_rbDmXLHmLqbTLKm9', // sub_app ID
  'bfb', // 渠道名字
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);
