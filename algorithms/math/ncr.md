# nCr

```cpp
    int fact[100005], invFact[100005];

    int binExp(int base, int exp){
        int res = 1;
    
        while(exp>0){
            if(exp&1){
                res = (res*1LL*base)%mod;
            }
            base = (base*1LL*base)%mod;
            exp>>=1;
        }
    
        return res;
    }

    void precompute(){
        fact[0]=1;

        for(int i=1;i<100005;i++){
            fact[i] = (fact[i-1]*1LL*i)%mod;
        }

        invFact[100004] = binExp(fact[100004],mod-2);
        /*
        (i+1)! = (i)!*(i+1)
        
        inverse on both sides
        ((i+1)!)^-1 = ((i)!)^-1*((i+1)^-1);
        
        reordering eqaution
        ((i)!)^-1 = ((i+1)!)^-1*(i+1)
        */

        for(int i=100003;i>=0;i--){
            invFact[i] = (invFact[i+1]*1LL*(i+1))%mod;
        }

        return;
    }
```
