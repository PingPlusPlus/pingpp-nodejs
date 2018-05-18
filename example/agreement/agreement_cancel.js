// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com) -> 点击管理平台右上角公司名称 -> 企业面板 -> 开发参数 -> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';

// 设置 api_key
var pingpp = require('../../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

/* 解约 */
pingpp.agreements.cancel(
  // 通过 Agreement 对象的 id 解除一个签约，更新状态为 canceled
  'agr_19EEE7QdgGMCoY',
  function(err, agreement) {
    if (err != null) {
      console.log('pingpp.agreements.cancel failed: ', err);
    } else {
      console.log(agreement);
    }
    // YOUR CODE
  }
);
