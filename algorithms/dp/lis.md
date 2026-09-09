# LIS (nlogn)

```cpp
pair<ll,vector<ll>>lis(vector<ll>&a){
  ll n = a.size();

  vector<ll>len;
  vector<ll>insertedAt(n);

  for(ll i=0;i<n;i++){
    if(len.size()==0 || len.back()<a[i]){
      len.push_back(a[i]);
      insertedAt[i] = len.size();
    }else{
      auto it = lower_bound(len.begin(),len.end(),a[i]);
      *it = a[i];
      insertedAt[i] = it-len.begin()+1;
    }
  }

  ll sz = len.size();
  ll idx = max_element(insertedAt.begin(),insertedAt.end())-insertedAt.begin();

  vector<ll>ans;

  while(idx>=0){
    if(sz==insertedAt[idx]){
      ans.push_back(a[idx]);
      sz--;
    }
    idx--;
  }

  reverse(ans.begin(),ans.end());

  return {len.size(),ans};
}
```