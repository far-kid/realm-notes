# Quick Sort (Lomuto)

```cpp
ll partition(vector<ll>&a, ll l, ll r){
  ll pivot = a[r];
  ll i = l;

  for(ll j=l;j<r;j++){
    if(a[j]<=pivot){
      swap(a[j],a[i]);
      i++;
    }
  }

  swap(a[i],a[r]);

  return i;
}

void quickSort(vector<ll>&a, ll l, ll r){
  if(l>=r) return;

  ll p = partition(a,l,r);

  quickSort(a,l,p-1);
  quickSort(a,p+1,r);

  return;
}

void realmsDomain(){
  ll n;cin>>n;
  vector<ll>a(n);

  for(auto &ele:a) cin>>ele;
  deb(a);
  quickSort(a,0,n-1);

  for(auto ele:a) cout<<ele<<" ";
  cout<<"\n";  
}
```