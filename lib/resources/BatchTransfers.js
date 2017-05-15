'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'batch_transfers',

  includeBasic: [
    'create', 'list', 'retrieve'
  ],

  update: pingppMethod({
    method: 'PUT',
    path: '{id}',
    urlParams: ['id']
  }),

  cancel: function(id, callback){
    this.update(id, {
      'status': 'canceled'
    }, callback);
  }

});
