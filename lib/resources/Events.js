'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'events',

  includeBasic: [
    'list', 'retrieve'
  ],

});
