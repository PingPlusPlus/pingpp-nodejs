'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'apps/{appId}/balance_transfers',

  create: pingppMethod({
    method: 'POST',
    urlParams: ['appId']
  }),

  retrieve: pingppMethod({
    method: 'GET',
    path: '/{balanceTransferId}',
    urlParams: ['appId', 'balanceTransferId']
  }),

  list: pingppMethod({
    method: 'GET',
    urlParams: ['appId']
  })
});
