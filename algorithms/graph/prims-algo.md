# Prim's Algorithm

```cpp
class Solution {
  public:
    int spanningTree(int v, vector<vector<int>>& edges) {
        vector<vector<pair<int,int>>>vp(v);

        for(auto ele:edges){
            vp[ele[0]].push_back({ele[1],ele[2]});
            vp[ele[1]].push_back({ele[0],ele[2]});
        }

        vector<int>vis(v,0);

        priority_queue<tuple<int,int,int>,vector<tuple<int,int,int>>,greater<>>pq;

        pq.push({0,0,-1});

        vector<pair<int,int>>mst;
        int sum = 0;

        while(!pq.empty()){
            auto [w,u,par] = pq.top();
            pq.pop();

            if(vis[u])  continue;
            vis[u]=1;

            mst.push_back({u,par});
            sum+=w;

            for(auto [v,weigh]:vp[u]){
                pq.push({weigh,v,u});
            }
        }

        return sum;
    }
};
```
