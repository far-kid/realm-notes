# Segment Tree

```cpp
/*It is happening, right here and now*/
        
#include "bits/stdc++.h"
using namespace std;

#define velociraptor ios_base::sync_with_stdio(false);cin.tie(0);cout.tie(0);                                             
#define all(v) v.begin(),v.end()
#define lcd(a,b) (a*b)/__gcd(a,b)
#define ll long long

const int mod = 1e9+7;

#ifdef chandan  
#include "starPlatinum.h"
#define deb(x...) cerr << "[" << #x << "] = ["; _print(x)
#else
#define deb(x...)
#endif

int a[100005], seg[4*100005];
int lazy[4*100005];

void build(int i, int l, int r){
    if(l==r){
        seg[i]=a[l];
        return;
    }

    int mid = l+(r-l)/2;
    build(2*i+1,l,mid);
    build(2*i+2,mid+1,r);
    seg[i] = seg[2*i+1]+seg[2*i+2];
    return ;
}

int query(int i, int low, int high, int l, int r){
    if(low>=l && r>=high) return seg[i];
    if(r<low || l>high || low>high) return 0;

    int mid = low+(high-low)/2;

    return query(2*i+1,low,mid,l,r)+query(2*i+2,mid+1, high, l,r);
}

void pointUpdate(int i,int low, int high, int node, int val){
    if(low==high){
        seg[i]+=val;
    }else{
        int mid = low+(high-low)/2;
        if(node<=mid && node>=low){
            pointUpdate(2*i+1,low,mid,node,val);
        }else{
            pointUpdate(2*i+2,mid+1,high,node,val);
        }

        seg[i] = seg[2*i+1]+seg[2*i+2];
    }
}

void rangeUpdate(int i, int low, int high, int l, int r, int val){
    if(lazy[i]!=0){
        seg[i]+=(high-low+1)*lazy[i];
        if(low!=high){
            lazy[2*i+1]+=lazy[i];
            lazy[2*i+2]+=lazy[i];
        }
        lazy[i]=0;
    }

    if(r<low || l>high || low>high) return;

    if(l<=low && high<=r){
        seg[i]+=(high-low+1)*val;
        if(low!=high){
            lazy[2*i+1]+=val;
            lazy[2*i+2]+=val;
        }
        return;
    }

    int mid = low+(high-low)/2;

    rangeUpdate(2*i+1,low,mid,l,r,val);
    rangeUpdate(2*i+2,mid+1,high,l,r,val);
    seg[i] = seg[2*ind+1]+seg[2*ind+2];
}

int querySumLazy(int i, int low, int high, int l, int r){
    if(lazy[i]!=0){
        seg[i]+=(high-low+1)*lazy[i];
        if(low!=high){
            lazy[2*i+1]+=lazy[i];
            lazy[2*i+2]+=lazy[i];
        }
        lazy[i]=0;
    }

    if(r<=low || l>=high ||low>high) return 0;
    if(l<=low && r>=high) return seg[i];

    int mid = low+(high-low)/2;

    return querySumLazy(2*i+1,low,mid,l,r)+querySumLazy(2*i+2,mid+1,high,l,r);
}

void realmsDomain(){
   int n; cin>>n;
   vector<int>a(n);
   vector<int>seg(4*n);

   build(0,0,n-1); 
}

int main() {
    clock_t time_req = clock();
    velociraptor


    #ifdef chandan 
    freopen("error.txt", "w", stderr); 
    #endif

    int tsts = 1 ; 

    cin>>tsts;    

    for(int testcase = 1 ; testcase <=  tsts ; testcase++ ){
        realmsDomain();
    }

    #ifdef chandan
    cerr << "Time : " << fixed << setprecision(6) << ((double)(clock() - time_req)) / CLOCKS_PER_SEC << endl;
    #endif

    return 0;
}
```
