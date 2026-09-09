# Cycle Detection in an Undirected Graph (DFS)

```cpp
class Solution {
  public:
    bool dfs(vector<vector<int>> &adj, int curr, int par, vector<int> &vis){
        int n = adj.size();
        vis[curr]=1;

        for(auto ele:adj[curr]){
            if(ele==par) continue;
            if(vis[ele]) return true;
            if(dfs(adj,ele,curr,vis)) return true;
        }

        return false;
    }

    bool isCycle(int v, vector<vector<int>>& edges) {
        vector<vector<int>>adj(v);

        for(auto ele:edges){
            adj[ele[0]].push_back(ele[1]);
            adj[ele[1]].push_back(ele[0]);
        }

        vector<int>vis(v,0);

        for(int i=0;i<v;i++){
            if(vis[i]) continue;
            if(dfs(adj,i,-1,vis)) return true;
        }

        return false;
    }
};
```
