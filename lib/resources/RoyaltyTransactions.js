'use strict';

var PingppResource = require('../PingppResource');

module.exports = PingppResource.extend({

  path: 'royalty_transactions',

  includeBasic: [
    'list', 'retrieve'
  ],

});
