// 配置 API Key 和 App ID
// 从 Ping++ 管理平台应用信息里获取
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC" // 这里填入你的 Test/Live Key
var APP_ID = "app_1Gqj58ynP0mHeX1q" // 这里填入你的应用 ID
var pingpp = require('pingpp')(API_KEY);

/* create a redEnvelope */
pingpp.redEnvelopes.create({
  order_no:    new Date().getTime().toString(),
  app:         { id: APP_ID },
  channel:     "wx_pub",
  amount:      100,
  currency:    "cny",
  subject:     "Your Subject",
  body:        "Your Body",
  extra: {
    nick_name: "Nick Name",
    send_name: "Send Name"
  },
  recipient:   "Openid",
  description: "Your Description"
}, function(err, redEnvelope) {
  // YOUR CODE
});

/* retrieve a redEnvelope */
pingpp.redEnvelopes.retrieve(
  "red_Py9WTCL8GKe1n54KG0Km1av1",
  function(err, redEnvelope) {
    // YOUR CODE
  }
);

/* list redEnvelopes */
pingpp.redEnvelopes.list(
  { limit: 10 },
  function(err, redEnvelopes) {
    // YOUR CODE
  }
);