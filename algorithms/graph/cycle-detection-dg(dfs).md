# Cycle Detection in a Directed Graph (DFS)

```cpp
class Solution {
  public:

    bool dfs(vector<vector<int>>&adj, vector<int>&vis, vector<int>&pathVis, int curr){

        if(pathVis[curr]) return true;
        if(vis[curr]) return false;

        vis[curr]=1;
        pathVis[curr]=1;

        bool flag = false;
        for(auto ele:adj[curr]){
            flag |= dfs(adj,vis,pathVis,ele);
            if(flag) return true;
        }

        pathVis[curr]=0;

        return flag;
    }

    bool isCyclic(int v, vector<vector<int>> &edges) {
        // code here
        vector<vector<int>>adj(v);

        for(auto ele:edges){
            adj[ele[0]].push_back(ele[1]);
        }

        vector<int>vis(v);
        vector<int>pathVis(v);
        bool flag = false;

        for(int i=0;i<v;i++){
            if(vis[i]) continue;
            flag |= dfs(adj,vis,pathVis,i);
            if(flag) return true;
        }

        return flag;
    }
};
```
