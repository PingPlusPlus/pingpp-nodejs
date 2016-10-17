'use strict';

var PingppResource = require('../PingppResource');

module.exports = PingppResource.extend({

  path: 'batch_transfers',

  includeBasic: [
    {"method_name":'create',"url_sign":false},
    {"method_name":'list',"url_sign":true},
    {"method_name":'retrieve',"url_sign":true}
  ],
});
