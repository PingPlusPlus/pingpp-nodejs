'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'apps/{appId}/withdrawals',

  create: pingppMethod({
    method: 'POST',
    urlParams: ['appId']
  }),

  retrieve: pingppMethod({
    method: 'GET',
    path: '/{id}',
    urlParams: ['appId', 'id']
  }),

  list: pingppMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

  update: pingppMethod({
    method: 'PUT',
    path: '/{id}',
    urlParams: ['appId', 'id']
  }),

  cancel: function(appId, id, callback) {
    return this.wrapTimeout(this.update(appId, id, {
      'status': 'canceled'
    }), callback);
  },

  confirm: function(appId, id, callback) {
    return this.wrapTimeout(this.update(appId, id, {
      'status': 'pending'
    }), callback);
  },

});
