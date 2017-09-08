'use strict';

var PingppResource = require('../PingppResource');

module.exports = PingppResource.extend({

  path: 'red_envelopes',

  includeBasic: [
    'create','list','retrieve'
  ],

});
