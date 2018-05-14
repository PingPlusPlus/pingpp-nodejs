'use strict';

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
