'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'apps/{appId}/balance_bonuses',

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
  })

});
