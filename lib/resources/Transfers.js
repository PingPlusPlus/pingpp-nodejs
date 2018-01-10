'use strict';

var PingppResource = require('../PingppResource');

module.exports = PingppResource.extend({

  path: 'transfers',

  includeBasic: [
    'create', 'list', 'retrieve'
  ],
});
