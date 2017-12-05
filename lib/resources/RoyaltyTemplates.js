'use strict';

var PingppResource = require('../PingppResource');
var pingppMethod = PingppResource.method;

module.exports = PingppResource.extend({

  path: 'royalty_templates',

  includeBasic: [
    'create', 'list', 'retrieve', 'del'
  ],

  update: pingppMethod({
    method: 'PUT',
    path: '/{id}',
    urlParams: ['id']
  })
});
