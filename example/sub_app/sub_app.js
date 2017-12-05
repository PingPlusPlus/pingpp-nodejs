// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = 'app_1Gqj58ynP0mHeX1q';
// 设置 api_key
var pingpp = require('../../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

/**
 * 创建 sub_app
 */
pingpp.subApps.create(APP_ID,{
  'display_name': 'Display Name',
  'user': 'test_user_for_sub_app',
  'metadata': {
    'key-1': 'value-1'
  },
  'description': 'Your description.'
}, function(err, data) {
  // YOUR CODE
  if (err != null){
    console.log(err);
  }
});

/**
 * 查询 sub_app
 */
pingpp.subApps.retrieve(
  APP_ID,
  'SUB_APP_ID', //  sub_app ID
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);

/**
 * 查询 sub_app 列表
 */
pingpp.subApps.list(
  APP_ID,
  { page: 1, per_page: 3 },
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);

/**
 * 更新 sub_app
 */
pingpp.subApps.update(
  APP_ID,
  'SUB_APP_ID', // sub_app ID
  {
    'description': 'New description',
  }, function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);

/**
 * 删除 sub_app
 */
pingpp.subApps.delete(
  APP_ID,
  'SUB_APP_ID', // sub_app ID
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);
