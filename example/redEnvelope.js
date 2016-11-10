// Ping++ Server SDK
// 说明：
// 以下代码只是为了方便商户测试而提供的样例代码，商户可根据自己网站需求按照技术文档编写, 并非一定要使用该代码。
// 接入红包流程参考开发者中心：https://www.pingxx.com/docs/server/red-envelope ，文档可筛选后端语言和接入渠道。
// 该代码仅供学习和研究 Ping++ SDK 使用，仅供参考。

// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC"
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = "app_1Gqj58ynP0mHeX1q"
// 设置 api_key
var pingpp = require('../lib/pingpp')(API_KEY);

/* create a redEnvelope */
pingpp.redEnvelopes.create({
  order_no:    new Date().getTime().toString(),// 红包使用的商户订单号。wx(新渠道)、wx_pub 规定为 1 ~ 28 位不能重复的数字
  app:         { id: APP_ID },
  channel:     "wx_pub",// 目前支持 wx(新渠道)、 wx_pub
  amount:      100,// 订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100，金额限制在 100 ~ 20000 之间，即 1 ~ 200 元）
  currency:    "cny",
  subject:     "Your Subject",
  body:        "Your Body",
  extra: {
    send_name: "Send Name"// 商户名称，最多 32 个字节
  },
  recipient:   "Openid",// 接收者 id， 为用户在 wx(新渠道)、wx_pub 下的 open_id
  description: "Your Description"
}, function(err, redEnvelope) {
  // YOUR CODE
});

/* retrieve a redEnvelope */
pingpp.redEnvelopes.retrieve(
  "red_Py9WTCL8GKe1n54KG0Km1av1",// 通过 Red_envelope 对象的 id 查询一个已创建的 Red_envelope 对象
  function(err, redEnvelope) {
    if (err != null) {
      console.log("pingpp.redEnvelopes.retrieve fail:", err);
    }
    // YOUR CODE
  }
);

/* list redEnvelopes */
pingpp.redEnvelopes.list(
  { limit: 10 },
  function(err, redEnvelopes) {
    if (err != null) {
      console.log("pingpp.redEnvelopes.list fail:", err);
    }
    // YOUR CODE
  }
);
