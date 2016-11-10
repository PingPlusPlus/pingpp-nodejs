// Ping++ Server SDK
// 说明：
// 以下代码只是为了方便商户测试而提供的样例代码，商户可根据自己网站需求按照技术文档编写, 并非一定要使用该代码。
// 接入企业付款流程参考开发者中心：https://www.pingxx.com/docs/server/transfer ，文档可筛选后端语言和接入渠道。
// 该代码仅供学习和研究 Ping++ SDK 使用，仅供参考。

// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC"
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = "app_1Gqj58ynP0mHeX1q"
// 设置 api_key
var pingpp = require('../lib/pingpp')(API_KEY);

pingpp.setPrivateKeyPath(__dirname + '/your_rsa_private_key.pem');

/* 企业付款 */
pingpp.batchTransfers.create({
  "app": APP_ID ,
  "batch_no": new Date().getTime().toString(), // 批量付款批次号
  "channel": "alipay", // 目前只支持 alipay
  "amount": 8000, // 批量付款总金额
  "description": "Your Description",
  "recipients": [
    {
      "account": "account01@alipay.com", // 接收者支付宝账号
      "amount": 5000, // 付款金额
      "name": "李狗" // 接收者姓名
    },
    {
      "account": "account02@alipay.com", // 接收者支付宝账号
      "amount": 3000, // 付款金额
      "name": "伢子" // 接收者姓名
    }
  ],
  "type": "b2c" // 付款类型，当前仅支持 b2c 企业付款
}, function(err, transfer) {
  if (err!=null){
    console.log("pingpp.batchTransfers.create fail:",err)
  }
  // YOUR CODE
});

/* 查询 */
pingpp.batchTransfers.retrieve(
  // 通过 Transfer 对象的 id 查询一个已创建的 Transfer 对象
  "181610181347533047",
  function(err, transfer) {
    if (err != null) {
      console.log("pingpp.batchTransfers.retrieve fail:", err);
    }
    // YOUR CODE
  }
);

/* 查询列表 */
pingpp.batchTransfers.list(
  { page: 1, per_page: 3 },
  function(err, transfers) {
    if (err != null) {
      console.log("pingpp.batchTransfers.list fail:", err);
    }
    // YOUR CODE
  }
);
