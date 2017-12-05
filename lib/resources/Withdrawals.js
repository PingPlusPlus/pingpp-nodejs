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
    path: '/{Id}',
    urlParams: ['appId', 'Id']
  }),

  list: pingppMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

  update: pingppMethod({
    method: 'PUT',
    path: '/{Id}',
    urlParams: ['appId', 'Id']
  }),

  cancel: function(appId, Id, callback){
    this.update(appId, Id, {
      'status': 'canceled'
    }, callback);
  },

  confirm: function(appId, Id, callback){
    this.update(appId, Id, {
      'status': 'pending'
    }, callback);
  },

});
