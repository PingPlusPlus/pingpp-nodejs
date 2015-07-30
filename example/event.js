// 配置 API Key 和 App ID
// 从 Ping++ 管理平台应用信息里获取
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC" // 这里填入你的 Test/Live Key
var pingpp = require('pingpp')(API_KEY);

// retrieve an event
pingpp.events.retrieve(
  'evt_VzWdLFbm5D6OdOuzQv7oqF0X',
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
