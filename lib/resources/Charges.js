'use strict';

var PingppResource = require('../PingppResource');
var Error = require('../Error');
var pingppMethod = PingppResource.method;
var hasOwn = {}.hasOwnProperty;

module.exports = PingppResource.extend({

  path: 'charges',

  includeBasic: [
    'create', 'retrieve'
  ],

  list: function(params, callback) {
    if ((!hasOwn.call(params, 'app')
        || typeof params.app != 'object'
        || !hasOwn.call(params.app, 'id'))
      && !hasOwn.call(params, 'app[id]')
    ) {
      return this.wrapTimeout(new Promise(function (resolve, reject) {
        reject(new Error.PingppInvalidRequestError({
          message: 'Please pass app[id] as parameter.'
        }));
      }), callback);
    } else {
      return this.wrapTimeout(pingppMethod({
        method: 'GET'
      }).call(this, params), callback);
    }
  },

  reverse: pingppMethod({
    method: 'POST',
    path: '/{chargeId}/reverse',
    urlParams: ['chargeId'],
  }),

  /**
   * Charge: Refund methods
   */
  createRefund: pingppMethod({
    method: 'POST',
    path: '/{chargeId}/refunds',
    urlParams: ['chargeId'],
  }),

  listRefunds: pingppMethod({
    method: 'GET',
    path: '/{chargeId}/refunds',
    urlParams: ['chargeId']
  }),

  retrieveRefund: pingppMethod({
    method: 'GET',
    path: '/{chargeId}/refunds/{refundId}',
    urlParams: ['chargeId', 'refundId']
  }),

});
