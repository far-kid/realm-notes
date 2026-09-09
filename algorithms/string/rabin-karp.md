# Rabin-Karp Algorithm

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

const int base = 31;
const int mod = 1e9+7;

bool rabinKarp(string &s, string &p){
    int n = s.size();
    int m = p.size();

    vector<ll>power(max(n,m));

    power[0]=1;

    for(int i=1;i<n;i++){
        power[i]=(power[i-1]*base)%mod;
    }

    ll pattHash = 0;

    for(int i=0;i<m;i++){
        pattHash = (pattHash+(p[i]-'a'+1)*power[i])%mod;
    }

    vector<ll>cmpHash(n+1);

    for(int i=1;i<=n;i++){
        cmpHash[i] = (cmpHash[i-1]+(s[i-1]-'a'+1)*power[i-1])%mod;
    }

    for(int i=0;i+m-1<n;i++){
        ll hash = (cmpHash[i+m]-cmpHash[i]+mod)%mod;
        if(hash==(pattHash*power[i])%mod){
            bool match = true;


            for(int j=i;j<i+m;j++){
                if(s[j]!=p[j-i]){
                    match=false;
                    break;
                }
            }

            if(match) return true;

        }
    }

    return false;
}


void realmsDomain(){
    string s,p; cin>>s>>p;
    if(rabinKarpSearch(s,p)){
        cout<<"True\n";
    }else cout<<"False\n";
}

int main() {
    clock_t time_req = clock();
    velociraptor


    #ifdef chandan 
    freopen("error.txt", "w", stderr); 
    #endif

    ll tsts = 1 ; 

    cin>>tsts;    

    for(ll testcase = 1 ; testcase <=  tsts ; testcase++ ){
        realmsDomain();
    }

    #ifdef chandan
    cerr << "Time : " << fixed << setprecision(6) << ((double)(clock() - time_req)) / CLOCKS_PER_SEC << endl;
    #endif

    return 0;
}
```
