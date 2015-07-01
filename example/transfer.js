var pingpp = require('pingpp')('YOUR-KEY');

/* 企业付款 */
pingpp.transfers.create({
  order_no:    "123456789",
  app:         { id: "APP_ID" },
  channel:     "wx_pub",
  amount:      100,
  currency:    "cny",
  type:        "b2c",
  recipient:   "Openid",
  description: "Your Description"
}, function(err, transfer) {
  // YOUR CODE
});

/* 查询 */
pingpp.transfers.retrieve(
  "TRANSFER_ID",
  function(err, transfer) {
    // YOUR CODE
  }
);

/* 查询列表 */
pingpp.transfers.list(
  { limit: 5 },
  function(err, transfers) {
    // YOUR CODE
  }
);