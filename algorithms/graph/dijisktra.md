# Dijkstra's Algorithm

```cpp
const int INF = 1e9+7;
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int,int>>>adj(n+1);

        for(auto ele:times){
            adj[ele[0]].push_back({ele[1],ele[2]});
        }

        set<pair<int,int>>st;
        vector<int>vis(n+1,INF);

        st.insert({k,0});
        vis[k]=0;

        while(!st.empty()){
            auto [u,cost] = *st.begin();
            st.erase(st.begin());

            if(vis[u]<cost) continue;

            for(auto [v,c]:adj[u]){
                if(vis[v]>c+cost){
                    st.erase({v,vis[v]});
                    vis[v]=c+cost;
                    st.insert({v,c+cost});
                }
            }
        }

        int mx = 0;
        for(int i=1;i<=n;i++){
            mx = max(mx,vis[i]);
        }

        return mx==INF?-1:mx;
    }
};
```
