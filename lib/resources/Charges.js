'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'charges',

  includeBasic: [
    {"name":'create',"urlSign":false},
    {"name":'list',"urlSign":true},
    {"name":'retrieve',"urlSign":true},
    {"name":'setMetadata'},
    {"name":'getMetadata'}
  ],

  /**
   * Charge: Refund methods
   */
  createRefund: pingppMethod({
    method: 'POST',
    path: '/{chargeId}/refunds',
    urlParams: ['chargeId'],
    urlSign:false,
  }),

  listRefunds: pingppMethod({
    method: 'GET',
    path: '/{chargeId}/refunds',
    urlParams: ['chargeId'],
    urlSign:true,
  }),

  retrieveRefund: pingppMethod({
    method: 'GET',
    path: '/{chargeId}/refunds/{refundId}',
    urlParams: ['chargeId', 'refundId'],
    urlSign:true,
  }),

});
