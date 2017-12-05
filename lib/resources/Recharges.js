'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: '/apps/{appId}/recharges',

  create: pingppMethod({
    method: 'POST',
    urlParams: ['appId']
  }),

  retrieve: pingppMethod({
    method: 'GET',
    path: '/{rechargeId}',
    urlParams: ['appId', 'rechargeId']
  }),

  list: pingppMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

  createRefund: pingppMethod({
    method: 'POST',
    path: '/{rechargeId}/refunds',
    urlParams: ['appId', 'rechargeId']
  }),

  retrieveRefund: pingppMethod({
    method: 'GET',
    path: '/{rechargeId}/refunds/{refundId}',
    urlParams: ['appId', 'rechargeId', 'refundId']
  }),

  listRefunds: pingppMethod({
    method: 'GET',
    path: '/{rechargeId}/refunds',
    urlParams: ['appId', 'rechargeId']
  })

});
