# 账户优惠券

### 创建优惠券模板
``` js
pingpp.couponTemplates.create(
  "APP_ID",
  {
    "name": "25OFF", // 优惠券模板名称
    "type": 1, // 优惠券模板的类型 1：现金券；2：折扣券
    "amount_off":1, // 折扣金额
    "amount_available": 10000, // 订单金额大于等于该值时，优惠券有效（适用于满减）；0 表示无限制
    "max_circulation": 1000, // 优惠券最大生成数量，当已生成数量达到最大值时，不能再生成优惠券；默认 null，表示可以无限生成
    "metadata": {
    },
    "expiration": null
  }, function(err, data) {
    // YOUR CODE
  }
);
```

### 查询优惠券模板
``` js
pingpp.couponTemplates.retrieve(
  "APP_ID", // APP ID
  "CT_ID", // 优惠券模板 id
  function(err, data) {
    // YOUR CODE
  }
);

pingpp.couponTemplates.list(
  "APP_ID", // APP ID
  {page: 1},
  function(err, datas) {
    // YOUR CODE
  }
);
```

### 优惠券模板更新
``` js
pingpp.couponTemplates.update(
  APP_ID, // APP ID
  "CT_ID", // 优惠券模板 id
  {
    "metadata": {
        "key": "value"
      }
  },
  function(err, data) {
    // YOUR CODE
  }
);
```

### 优惠券模板删除
``` js
pingpp.couponTemplates.delete(
  APP_ID, // APP ID
  "CT_ID", // 优惠券模板 id
  function(err, data) {
    // YOUR CODE
  }
);
```

###  批量创建优惠券
``` js
pingpp.couponTemplates.createCoupon(
  "APP_ID", // APP ID
  "CT_ID", // 优惠券模板 id
  {
    "users": [
      "user_id_1",
      "user_id_2",
      "user_id_3"
    ]
  }, function(err, data) {
    // YOUR CODE
  }
);
```

### 查询优惠券模板创建的优惠券列表
``` js
pingpp.couponTemplates.listCoupons(
  "APP_ID", // APP ID
  "CT_ID", // 优惠券模板 id
  {page: 1},
  function(err, datas) {
    // YOUR CODE
  }
);
```