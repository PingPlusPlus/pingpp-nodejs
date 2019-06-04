'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'apps/{appId}/coupon_templates',

  create: pingppMethod({
    method: 'POST',
    urlParams: ['appId']
  }),

  list: pingppMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

  retrieve: pingppMethod({
    method: 'GET',
    path: '/{id}',
    urlParams: ['appId', 'id']
  }),

  update: pingppMethod({
    method: 'PUT',
    path: '/{id}',
    urlParams: ['appId', 'id']
  }),

  delete: pingppMethod({
    method: 'DELETE',
    path: '/{id}',
    urlParams: ['appId', 'id']
  }),

  createCoupon: pingppMethod({
    method: 'POST',
    path: '/{couponTmplId}/coupons',
    urlParams: ['appId', 'couponTmplId']
  }),

  listCoupons: pingppMethod({
    method: 'GET',
    path: '/{couponTmplId}/coupons',
    urlParams: ['appId', 'couponTmplId']
  }),
});
