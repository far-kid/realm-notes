# Merge Sort

```cpp
void merge(vector<ll>&a, ll l , ll r){
  if(l==r) return;

  ll mid = l+(r-l)/2;

  merge(a,l,mid);
  merge(a,mid+1,r);

  ll i = l, j = mid+1;

  vector<ll>c;

  while(i<=mid && j<=r){
    if(a[i]<a[j]){
      c.push_back(a[i]);
      i++;
    }else{
      c.push_back(a[j]);
      j++;
    }
  }

  while(i<=mid){
    c.push_back(a[i++]);
  }

  while(j<=r){
    c.push_back(a[j++]);
  }

  for(ll i=l;i<=r;i++){
    a[i] = c[i-l];
  }

  return;
}

void mergeSort(vector<ll>&a){
  ll n = a.size();
  if(n==0) return;
  merge(a,0,n-1);
  return;
}

void realmsDomain(){
  ll n; cin>>n;
  vector<ll>a(n);

  for(auto &ele:a) cin>>ele;

  mergeSort(a);

  for(auto ele:a) cout<<ele<<" ";
  cout<<"\n";
}
```