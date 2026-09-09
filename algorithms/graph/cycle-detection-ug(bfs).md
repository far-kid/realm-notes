# Cycle Detection in an Undirected Graph (BFS)

```cpp
/*
- If end at a same position even with different routes there is a cycle in the graph
*/

class Solution {
  public:
    bool isCycle(int v, vector<vector<int>>& edges) {
        vector<vector<int>>adj(v);

        for(auto ele:edges){
            adj[ele[0]].push_back(ele[1]);
            adj[ele[1]].push_back(ele[0]);
        }

        vector<int>vis(v,0);

        queue<pair<int,int>>q;


        for(int i=0;i<v;i++){
            if(vis[i]==1) continue;
            q.push({i,-1});
            vis[i]=1;

            while(!q.empty()){
                auto [curr, par] = q.front();
                q.pop();

                for(auto ele:adj[curr]){

                    if(ele==par) continue;
                    if(vis[ele]) return true;
                    vis[ele]=1;
                    q.push({ele,curr});
                }
            }
        }

        return false;
    }
};
```
