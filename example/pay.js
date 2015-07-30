// 配置 API Key 和 App ID
// 从 Ping++ 管理平台应用信息里获取
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC" // 这里填入你的 Test/Live Key
var APP_ID = "app_1Gqj58ynP0mHeX1q" // 这里填入你的应用 ID

var pingpp = require('pingpp')(API_KEY);
// pingpp.parseHeaders(/*headers*/); // 把从客户端传上来的 Headers 传到这里
var channel = 'alipay'; // 选择渠道
var extra = {};
switch (channel) {
  case 'alipay_wap':
    extra = {
      'success_url': 'http://www.yourdomain.com/success',
      'cancel_url': 'http://www.yourdomain.com/cancel'
    };
    break;
  case 'upacp_wap':
    extra = {
      'result_url': 'http://www.yourdomain.com/result'
    };
    break;
}
var crypto = require('crypto');
var order_no = crypto.createHash('md5')
              .update(new Date().getTime().toString())
              .digest('hex').substr(0, 16);
pingpp.charges.create({
  order_no:  order_no,
  app:       { id: APP_ID },
  channel:   channel,
  amount:    100,
  client_ip: "127.0.0.1",
  currency:  "cny",
  subject:   "Your Subject",
  body:      "Your Body",
  extra:     extra
}, function(err, charge) {
  // YOUR CODE
});
