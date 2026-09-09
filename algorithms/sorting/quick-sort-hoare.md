# Quick Sort (Hoare)

```cpp
ll partition(vector<ll>&a, ll l, ll r){
  ll pivot = a[l];


  ll i = l, j = r;

  while(true){

    while(a[i]<pivot) i++;
    while(a[j]>pivot) j--;

    if(i>=j) return j;

    swap(a[i],a[j]);

    i++;
    j--;
  }

  return -1;
}

void quickSort(vector<ll>&a, ll l, ll r){
  if(l>=r) return;

  ll p = partition(a,l,r);

  quickSort(a,l,p);
  quickSort(a,p+1,r);

  return;
}

void realmsDomain(){
  ll n;cin>>n;
  vector<ll>a(n);
  for(auto &ele:a) cin>>ele; 

  bool flagF = true, flagB = true;
  for(ll i=1;i<n;i++){
    if(a[i]<a[i-1]) flagF = false;
    if(a[i]>a[i-1]) flagB = false;
  }

  if(flagB) reverse(all(a));

  if(!flagF && !flagB){
    quickSort(a,0,n-1);
  }

  for(auto ele:a) cout<<ele<<" ";
  cout<<"\n";  
}
```