'use strict';

var PingppResource = require('../PingppResource');

module.exports = PingppResource.extend({

  path: 'charges/{chargeId}/refunds',

  includeBasic: [
    'create', 'list', 'retrieve',
  ],

});
