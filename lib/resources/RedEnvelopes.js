'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'red_envelopes',

  includeBasic: [
    'create', 'list', 'retrieve'
  ],

});
