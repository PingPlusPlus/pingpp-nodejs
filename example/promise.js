'use strict';

// SDK 支持 Promise，以 charge 为例，可以按以下方法调用

const API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';

var pingpp = require('../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, 'your_rsa_private_key.pem'));

pingpp.charges.retrieve(
  'ch_bLWP80Ci9S4ODaXLSKLOGe5S'
).then(ch => {
  console.log(ch);
}).catch(e => {
  console.log(e);
});
