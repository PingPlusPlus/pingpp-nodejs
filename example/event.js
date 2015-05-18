var pingpp = require('pingpp')('YOUR-KEY');

// retrieve an event
pingpp.events.retrieve(
  'EVENT_ID',
  function(err, event) {
    // YOUR CODE
  }
);

// list all events
pingpp.events.list(
  { limit: 3 },
  function(err, events) {
    // YOUR CODE
  }
);
