'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'orders',

  includeBasic: [
    'create','list','retrieve'
  ],

  update: pingppMethod({
    method: 'PUT',
    path: '{id}',
    urlParams: ['id']
  }),

  cancel: function(id, callback) {
    return this.wrapTimeout(this.update(id, {
      'status': 'canceled'
    }), callback);
  },

  pay: pingppMethod({
    method: 'POST',
    path: '/{orderId}/pay',
    urlParams: ['orderId']
  }),

  createRefund: pingppMethod({
    method: 'POST',
    path: '/{orderId}/order_refunds',
    urlParams: ['orderId']
  }),


  listRefunds: pingppMethod({
    method: 'GET',
    path: '/{orderId}/order_refunds',
    urlParams: ['orderId']
  }),

  retrieveRefund: pingppMethod({
    method: 'GET',
    path: '/{orderId}/order_refunds/{refundId}',
    urlParams: ['orderId','refundId']
  }),

  retrieveCharge: pingppMethod({
    method: 'GET',
    path: '/{orderId}/charges/{chargeId}',
    urlParams: ['orderId','chargeId']
  }),

  listCharges: pingppMethod({
    method: 'GET',
    path: '/{orderId}/charges',
    urlParams: ['orderId']
  })

});
