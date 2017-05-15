// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';

// 设置 api_key
var pingpp = require('../lib/pingpp')(API_KEY);
pingpp.setPrivateKeyPath(__dirname + '/your_rsa_private_key.pem');

/* 查询 */
pingpp.transfers.retrieve(
  // 通过 Transfer 对象的 id 查询一个已创建的 Transfer 对象
  'tr_Hm5uDSH8qP8OvbrT0GfDOerP',
  function(err, transfer) {
    if (err != null) {
      console.log('pingpp.transfers.retrieve failed: ', err);
    } else {
      console.log(transfer);
    }
    // YOUR CODE
  }
);
