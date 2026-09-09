# Kruskal's Algorithm

```cpp
// User function Template for C++
class DSU{
    vector<int>sz,parent;
    
    public:
    DSU(int n){
        sz.resize(n,1);
        parent.resize(n);
        
        for(int i=0;i<n;i++){
            parent[i]=i;
        }
    }
    
    int findParent(int u){
        if(parent[u]==u) return u;
        return parent[u] = findParent(parent[u]);
    }
    
    void unionBySz(int u, int v){
        int ult_u = findParent(u);
        int ult_v = findParent(v);
        
        if(ult_u==ult_v) return;
        
        if(sz[ult_u]>sz[ult_v]){
            parent[ult_v]=ult_u;
            sz[ult_u]+=sz[ult_v];
        }else{
            parent[ult_u]=ult_v;
            sz[ult_v]+=sz[ult_u];
        }
        
        return;
    }
};

class Solution {
  public:
    
    int kruskalsMST(int v, vector<vector<int>> &edges) {
        sort(edges.begin(),edges.end(),[&](vector<int>e1,vector<int>e2){
           return e1[2]<e2[2]; 
        });
        
        DSU ds(v);
        
        vector<pair<int,int>>mst;
        int cost = 0;
        
        for(auto ele:edges){
            int u = ele[0];
            int v = ele[1];
            int w = ele[2];
            
            if(ds.findParent(u)==ds.findParent(v)) continue;
            cost+=w;
            mst.push_back({u,v});
            ds.unionBySz(u,v);
        }
        
        return cost;
    }
};
```

