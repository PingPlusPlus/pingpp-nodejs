'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'apps/{appId}/batch_withdrawals',

  create: pingppMethod({
    method: 'POST',
    path: '',
    urlParams: ['appId']
  }),

  retrieve: pingppMethod({
    method: 'GET',
    path: '/{batchWithdrawalId}',
    urlParams: ['appId','batchWithdrawalId']
  }),

  list: pingppMethod({
    method: 'GET',
    urlParams: ['appId']
  })

});
