// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = 'app_1Gqj58ynP0mHeX1q';
// 设置 api_key
var pingpp = require('../lib/pingpp')(API_KEY);
pingpp.setPrivateKeyPath(__dirname + '/your_rsa_private_key.pem');

/* 查询列表 */
pingpp.transfers.list(
  { limit: 3, app: { id: APP_ID }},
  function(err, transfers) {
    if (err != null) {
      console.log('pingpp.transfers.list failed: ', err);
    } else {
      console.log(transfers);
    }
    // YOUR CODE
  }
);
