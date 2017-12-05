'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({
  path: 'apps/{appId}/balance_transactions',

  list: pingppMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

  retrieve: pingppMethod({
    method: 'GET',
    path: '/{txnId}',
    urlParams: ['appId', 'txnId']
  }),
});
