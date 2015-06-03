/**
 * Ping++ Server SDK
 * 说明：
 * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己的需要，按照技术文档编写。
 * 该代码仅供学习和研究 Ping++ SDK 使用，只是提供一个参考。
 */
var pingpp = require('pingpp')('YOUR-KEY');

pingpp.charges.createRefund(
  "CHARGE_ID",
  { amount: 100, description: "Refund Description" },
  function(err, refund) {
    // YOUR CODE
  }
);
