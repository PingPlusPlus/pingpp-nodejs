# 红包
``` js
pingpp.redEnvelopes.create({
  order_no:    "123456789",
  app:         { id: "APP_ID" },
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
```