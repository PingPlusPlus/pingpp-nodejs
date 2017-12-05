# 分润结算明细

### 查询分润结算明细列表
``` js
pingpp.royaltyTransactions.list(
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


### 查询分润结算明细
``` js
pingpp.royaltyTransactions.retrieve(
  '441170612143400001', // royaltyTransactions ID
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
    console.log(data);
  }
);
```
