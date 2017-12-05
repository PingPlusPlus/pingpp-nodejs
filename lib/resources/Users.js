'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'apps/{appId}/users',

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
    path: '/{userId}',
    urlParams: ['appId', 'userId']
  }),

  update: pingppMethod({
    method: 'PUT',
    path: '/{userId}',
    urlParams: ['appId', 'userId']
  }),

});
