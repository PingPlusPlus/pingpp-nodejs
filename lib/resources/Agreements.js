'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'agreements',

  includeBasic: [
    'create', 'list', 'retrieve'
  ],

  update: pingppMethod({
    method: 'PUT',
    path: '/{id}',
    urlParams: ['id']
  }),

  notify: pingppMethod({
    method: 'POST',
    path: '/{id}/notify',
    urlParams: ['id']
  }),

  cancel: function(id, callback) {
    return this.wrapTimeout(this.update(id, {
      'status': 'canceled'
    }), callback);
  },
});
