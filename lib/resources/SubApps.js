'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'apps/{appId}/sub_apps',

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
    path: '/{subAppId}',
    urlParams: ['appId', 'subAppId']
  }),

  update: pingppMethod({
    method: 'PUT',
    path: '/{subAppId}',
    urlParams: ['appId', 'subAppId']
  }),

  delete: pingppMethod({
    method: 'DELETE',
    path: '/{subAppId}',
    urlParams: ['appId', 'subAppId']
  }),

  createChannel: pingppMethod({
    method: 'POST',
    path: '/{subAppId}/channels',
    urlParams: ['appId', 'subAppId']
  }),

  updateChannel: pingppMethod({
    method: 'PUT',
    path: '/{subAppId}/channels/{channelName}',
    urlParams: ['appId', 'subAppId', 'channelName']
  }),

  retrieveChannel: pingppMethod({
    method: 'GET',
    path: '/{subAppId}/channels/{channelName}',
    urlParams: ['appId', 'subAppId', 'channelName']
  }),

  deleteChannel: pingppMethod({
    method: 'DELETE',
    path: '/{subAppId}/channels/{channelName}',
    urlParams: ['appId', 'subAppId', 'channelName']
  }),

});
