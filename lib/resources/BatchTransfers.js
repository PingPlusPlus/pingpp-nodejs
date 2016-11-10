'use strict';

var PingppResource = require('../PingppResource');

module.exports = PingppResource.extend({

  path: 'batch_transfers',

  includeBasic: [
    'create', 'list', 'retrieve'
  ]

});
