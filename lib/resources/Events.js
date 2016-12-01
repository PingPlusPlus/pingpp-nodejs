'use strict';

var PingppResource = require('../PingppResource');

module.exports = PingppResource.extend({

  path: 'events',

  includeBasic: [
    'retrieve'
  ],

});
