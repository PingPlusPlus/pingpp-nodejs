'use strict';

// SDK 支持 Promise，以 charge 为例，可以按以下方法调用

const API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';
const APP_ID = 'app_1Gqj58ynP0mHeX1q';

var pingpp = require('../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, 'your_rsa_private_key.pem'));

pingpp.charges.retrieve(
  'ch_40iPeHTuHqj1eHeH44qn5yTG'
).then(ch => {
  console.log(ch);
}).catch(e => {
  console.log(e);
});

pingpp.charges.list(
  {'limit': 3, 'app': {'id': APP_ID}}
).then(chs => {
  console.log(chs);
}).catch(e => {
  console.log(e);
});
