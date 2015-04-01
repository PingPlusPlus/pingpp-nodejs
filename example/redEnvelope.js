var pingpp = require('pingpp')('YOUR-KEY');

/* create a redEnvelope */
pingpp.redEnvelopes.create({
  order_no:    "123456789",
  app:         { id: "YOUR-APP-ID" },
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
  "RED-ENVELOPE-ID",
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