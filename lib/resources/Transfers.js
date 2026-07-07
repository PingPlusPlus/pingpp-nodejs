'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'transfers',

  includeBasic: [
    'create', 'list', 'retrieve'
  ],

  reverse: pingppMethod({
    method: 'POST',
    path: '/{transferId}/reverse',
    urlParams: ['transferId']
  }),
});
