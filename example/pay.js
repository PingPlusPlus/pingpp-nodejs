/**
 * Ping++ Server SDK
 * 说明：
 * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己的需要，按照技术文档编写。
 * 该代码仅供学习和研究 Ping++ SDK 使用，只是提供一个参考。
 */
var pingpp = require('pingpp')('YOUR-KEY');
// pingpp.parseHeaders(/*headers*/); // 把从客户端传上来的 Headers 传到这里
var channel = 'alipay';
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
      'result_url': 'http://www.yourdomain.com/result?code='
    };
    break;
}
var crypto = require('crypto');
var order_no = crypto.createHash('md5')
              .update(new Date().getTime().toString())
              .digest('hex').substr(0, 16);
pingpp.charges.create({
  order_no:  order_no,
  app:       { id: "APP_ID" },
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
