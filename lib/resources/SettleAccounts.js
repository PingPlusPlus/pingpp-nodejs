'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'apps/{appId}/users/{userId}/settle_accounts',

  create: pingppMethod({
    method: 'POST',
    urlParams: ['appId', 'userId']
  }),

  list: pingppMethod({
    method: 'GET',
    urlParams: ['appId', 'userId']
  }),

  retrieve: pingppMethod({
    method: 'GET',
    path: '/{settleAccountId}',
    urlParams: ['appId', 'userId', 'settleAccountId']
  }),

  delete: pingppMethod({
    method: 'DELETE',
    path: '/{settleAccountId}',
    urlParams: ['appId', 'userId', 'settleAccountId']
  }),

});
