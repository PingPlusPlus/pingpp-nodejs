var pingpp = require('pingpp')('YOUR-KEY');

var date = new Date();
var month = date.getMonth() + 1;
var formated_date = date.getFullYear() + (month < 10 ? "0" + month : month) + date.getDate();
var mch_id = 'MERCHANT-ID';
var order_no = mch_id + formated_date + "123";
/* create a redEnvelope */
pingpp.redEnvelopes.create({
  order_no:  order_no,
  app:       {id: "YOUR-APP-ID"},
  channel:   "wx_pub",
  amount:    100,
  currency:  "cny",
  recipient: "recipient openid",
  subject:   "Your Subject",
  body:      "Your Body",
  description: "Description",
  extra:     {
    nick_name: "Nick Name",
    send_name: "Send Name"
  }
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
  function(err, redEnvelope) {
    // YOUR CODE
  }
);
