'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'apps/{appId}/balance_settlements',

  retrieve: pingppMethod({
    method: 'GET',
    path: '/{balanceSettlementId}',
    urlParams: ['appId', 'balanceSettlementId']
  }),

  list: pingppMethod({
    method: 'GET',
    urlParams: ['appId']
  })
});
