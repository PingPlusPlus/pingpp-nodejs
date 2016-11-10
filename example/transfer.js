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
pingpp.transfers.create({
  order_no:    new Date().getTime().toString(),
  app:         { id: APP_ID },
  channel:     "wx_pub",// 目前支持 wx(新渠道)、 wx_pub
  amount:      100,// 订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100,企业付款最小发送金额为 1 元）
  currency:    "cny",
  type:        "b2c",// 付款类型，当前仅支持 b2c 企业付款
  recipient:   "Openid",// 接收者 id， 为用户在 wx(新渠道)、wx_pub 下的 open_id
  description: "Your Description"
}, function(err, transfer) {
  if (err != null) {
    console.log("pingpp.transfers.create fail:", err);
  }
  // YOUR CODE
});

/* 查询 */
pingpp.transfers.retrieve(
  // 通过 Transfer 对象的 id 查询一个已创建的 Transfer 对象
  "tr_Hm5uDSH8qP8OvbrT0GfDOerP",
  function(err, transfer) {
    if (err != null) {
      console.log("pingpp.transfers.retrieve fail:", err);
    }
    // YOUR CODE
  }
);

/* 查询列表 */
pingpp.transfers.list(
  { limit: 5 },
  function(err, transfers) {
    if (err != null) {
      console.log("pingpp.transfers.list fail:", err);
    }
    // YOUR CODE
  }
);

/* 企业付款 */
pingpp.transfers.create({
  order_no:    new Date().getTime().toString(),
  app:         { id: APP_ID },
  channel:     "unionpay",// 目前支持 wx(新渠道)、 wx_pub、 unionpay
  amount:      100,// 订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100,企业付款最小发送金额为 1 元）
  currency:    "cny",
  type:        "b2c",// 付款类型，当前仅支持 b2c 企业付款
  description: "Your Description",
  extra: {
    "user_name": "User Name",
    "card_number":"111111",
    "open_bank_code":"0100"
  }
}, function(err, transfer) {
  if (err != null) {
    console.log("pingpp.transfers.create(unionpay) fail:", err);
    return
  }
  pingpp.transfers.cancel(
    transfer.id,
    function(err, transfer) {
      if (err != null) {
        console.log("pingpp.transfers.cancel fail:", err);
      }
      // YOUR CODE
    }
  );
});
