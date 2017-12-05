// Ping++ Server SDK
// 说明：
// 以下代码只是为了方便商户测试而提供的样例代码，商户可根据自己网站需求按照技术文档编写, 并非一定要使用该代码。
// API接入文档：https://www.pingxx.com ，文档可筛选后端语言和接入渠道。
// 该代码仅供学习和研究 Ping++ SDK 使用，仅供参考。

// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC";
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = "app_1Gqj58ynP0mHeX1q";
// 设置 api_key
var pingpp = require('../../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

/**
 * 创建 recharge 退款
 */
var params_create = {
  'description': 'Recharge Refund Description'  // 描述 必传
};
pingpp.recharge.createRefund(APP_ID,
  '220170901352207144960002',       // Recharge ID
  params_create,
  function(err, recharge) {
    if (err != null){
      console.log('pingpp.recharge.createRefund fail:', err);
    }
    // YOUR CODE
});

/**
 * 查询单个 recharge 退款
 */
pingpp.recharge.retrieveRefund(APP_ID,
  '220170901352207144960002',       // Recharge ID
  're_LSGuH4mjjj94Pm9GG4zHezX1',    // Refund ID
  function(err, recharge) {
    if (err != null){
      console.log('pingpp.recharge.retrieveRefund fail:', err);
    }
    // YOUR CODE
});

/**
 * 查询 recharge 退款列表
 */
var params_list = {
  'page': 1,
  'per_page': 3
};
pingpp.recharge.listRefunds(APP_ID,
  '220170822360378572800001',       // Recharge ID
  params_list,
  function(err, recharges) {
    if (err != null){
      console.log('pingpp.recharge.listRefunds fail:', err);
    }
    // YOUR CODE
});