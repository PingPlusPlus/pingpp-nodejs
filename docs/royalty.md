# 分润

### 批量更新分润对象
``` js
pingpp.royalties.batchUpdate(
  {
    'ids': ['411170614151400001'],    // 分润 ID 列表, 必传
    'method': null,                   // 手动标记结算: manual 或 取消手动标记结算：null, 可选
    'description': 'Your description'
  },
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);
```


### 查询分润对象
``` js
pingpp.royalties.retrieve(
  '411170614151400001', // royalties ID
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);
```


### 查询分润对象列表
``` js
pingpp.royalties.list(
  { page: 1, per_page: 3 },
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
    console.log(data);
  }
);
```
