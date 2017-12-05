var PingppResource = require('../PingppResource');

module.exports = PingppResource.extend({

  path: 'customs',

  includeBasic: [
    'create','retrieve'
  ],

});
