'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'red_envelopes',

  includeBasic: [
    { "name": 'create', "urlSign": false },
    { "name": 'list', "urlSign": true },
    { "name": 'retrieve', "urlSign": true }
  ],

});
