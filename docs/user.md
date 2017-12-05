# 账户

### 创建账户
``` js
pingpp.users.create("APP_ID",{
  "id": new Date().getTime().toString(),
  "address": null,
  "avatar": null,
  "email": null,
  "gender": "MALE",
  "metadata": {},
  "mobile": null,
  "name": "123"
}, function(err, user) {
  // YOUR CODE
});
```

### 查询账户
``` js
pingpp.users.retrieve(
  "APP_ID",
  "USER_ID",
  function(err, user) {
    // YOUR CODE
  }
);

pingpp.users.list(
  "APP_ID",
  {page: 1},
  function(err, users) {
    // YOUR CODE
  }
);
```

### 更新账户
``` js
pingpp.users.update(
  APP_ID,
  "USER_ID",  // 账户 ID
  {
  "address": null,  // 用户地址
  "avatar": null,   // 头像
  "email": null,    // 邮箱地址
  "gender": "MALE", // 性别
  "metadata": {},   // metadata
  "mobile": null,   // 手机号码
  "name": "123",    // 用户昵称
  //"disabled":false  // 是否禁用。使用该参数时，不能同时使用其他参数。
}, function(err, user) {
  if (err!=null){
    console.log("pingpp.users.update fail:",err)
  }
  // YOUR CODE
});
```
