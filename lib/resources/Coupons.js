'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'apps/{appId}/users',

  create: pingppMethod({
    method: 'POST',
    path: '/{userId}/coupons',
    urlParams: ['appId', 'userId']
  }),

  list: pingppMethod({
    method: 'GET',
    path: '/{userId}/coupons',
    urlParams: ['appId', 'userId']
  }),

  retrieve: pingppMethod({
    method: 'GET',
    path: '/{userId}/coupons/{couponsId}',
    urlParams: ['appId', 'userId', 'couponsId']
  }),

  update: pingppMethod({
    method: 'PUT',
    path: '/{userId}/coupons/{couponsId}',
    urlParams: ['appId', 'userId', 'couponsId']
  }),

  delete: pingppMethod({
    method: 'DELETE',
    path: '/{userId}/coupons/{couponsId}',
    urlParams: ['appId', 'userId', 'couponsId']
  }),
});
