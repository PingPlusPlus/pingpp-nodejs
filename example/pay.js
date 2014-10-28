/**
 * Ping++ Server SDK
 * 说明：
 * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己的需要，按照技术文档编写。
 * 该代码仅供学习和研究 Ping++ SDK 使用，只是提供一个参考。
 */
var pingpp = require('pingpp')('YOUR-KEY');

pingpp.charges.create({
  subject: "Charge Subject",
  body: "Charge Body",
  amount: 100,
  order_no: "OrderNo",
  channel: pingpp.channel.ALIPAY,
  client_ip: "127.0.0.1",
  app: {id: "YOUR-APP-ID"}
}, function(err, charge) {
  // YOUR CODE
});