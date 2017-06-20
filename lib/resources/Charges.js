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

  _listCharges: pingppMethod({
    method: 'GET'
  }),

  list: function(params, cb) {
    if (!hasOwn.call(params, 'app')
      || typeof params.app != 'object'
      || !hasOwn.call(params.app, 'id')
    ) {
      cb.call(null, new Error.PingppInvalidRequestError({
        message: 'Please pass app[id] as parameter.'
      }));
    } else {
      this._listCharges(params, cb);
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
