'use strict';

var PingppResource = require('../PingppResource');

module.exports = PingppResource.extend({

  path: 'agreements',

  includeBasic: [
    'create', 'list', 'retrieve'
  ],
});
