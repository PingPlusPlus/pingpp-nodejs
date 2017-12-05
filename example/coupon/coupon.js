// Ping++ Server SDK
// 说明：
// 以下代码只是为了方便商户测试而提供的样例代码，商户可根据自己网站需求按照技术文档编写, 并非一定要使用该代码。
// 接入账户系统参考开发者中心：https://www.pingxx.com/docs/server/transfer ，文档可筛选后端语言和接入渠道。
// 该代码仅供学习和研究 Ping++ SDK 使用，仅供参考。

// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC"
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = "app_1Gqj58ynP0mHeX1q"
// 设置 api_key
var pingpp = require('../../lib/pingpp')(API_KEY);
var path = require('path');

pingpp.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));


/**
 * 创建优惠券
 */
pingpp.coupons.create(
  APP_ID, // App ID
  "123", // 用户 ID,
  {
    "coupon_template":"300117083118533800023602",
    "metadata": {
    },
  }, function(err, data) {
    if (err!=null){
      console.log("pingpp.coupons.create fail:",err)
    }
    console.log(data);
    // YOUR CODE
  }
);

/**
 * 查询单个优惠券
 */
pingpp.coupons.retrieve(
  APP_ID, // App ID
  "123", // 用户 ID
  "300317083118552300072201",
  function(err, data) {
    if (err!=null){
      console.log("pingpp.coupons.retrieve fail:",err)
    }
    // YOUR CODE
  }
);

/**
 * 查询账户优惠券列表
 */
pingpp.coupons.list(
  APP_ID, // App ID
  "123", // 用户 ID
  {page: 1},
  function(err, datas) {
    if (err!=null){
      console.log("pingpp.coupons.list fail:",err)
    }
    // YOUR CODE
  }
);

/**
 * 更新优惠券
 */
pingpp.coupons.update(
  APP_ID, // App ID
  "123", // 用户 ID
  "300317083118552300072201",// 优惠券 ID
  {
    "metadata": {
        "key": "new value"
    }
  },
  function(err, data) {
    if (err!=null){
      console.log("pingpp.coupons.update fail:",err)
    }
    // YOUR CODE
  }
);

/**
 * 删除账户优惠券
 */
pingpp.coupons.delete(
  APP_ID, // App ID
  "123", // 用户 ID
  "300317083118524400042602",// 优惠券 ID
  function(err, data) {
    if (err!=null){
      console.log("pingpp.coupons.delete fail:",err)
    }
    // YOUR CODE
  }
);

/**
 * 批量创建优惠券
 */
pingpp.couponTemplates.createCoupon(
  APP_ID, // APP ID
  "300117083118482700048701",// 优惠券模板 ID
  {
    "users": [ // 用户 ID 列表
      "user_id_1",
      "user_id_2",
      "user_id_3"
    ]
  }, function(err, data) {
    if (err!=null){
      console.log("pingpp.couponTemplates.createCoupon fail:",err)
    }
    // YOUR CODE
  }
);

/**
 * 查询优惠券模板创建的优惠券列表
 */
pingpp.couponTemplates.listCoupons(
  APP_ID, // APP ID
  "300117083118482700048701", // 优惠券模板 ID
  {page: 1},
  function(err, datas) {
    if (err!=null){
      console.log("pingpp.couponTemplates.listCoupons fail:",err)
    }
    // YOUR CODE
  }
);