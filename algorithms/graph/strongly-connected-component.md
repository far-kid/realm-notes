# Strongly Connected Components

```cpp
//Position this line where user code will be pasted.
/*
- sort all the vertices on the basis of finishing time (increasing order)
- reverse all the edges (cycle remains)
- call a dfs on these reversed edges
*/

class Solution {
  public:
    void finishTimeDFS(vector<vector<int>>& adj, vector<int> &vis, int u, stack<int>&order){
        if(vis[u]) return;
        vis[u]=1;

        for(auto v:adj[u]){
            finishTimeDFS(adj,vis,v,order);
        }

        order.push(u);
    }

    void dfs(vector<vector<int>>& adj, vector<int> &vis, int u, vector<int>&keep){
        if(vis[u]) return;
        vis[u]=1;

        for(auto v:adj[u]){
            dfs(adj,vis,v,keep);
        }

        keep.push_back(u);
    }

    int kosaraju(vector<vector<int>> &adj) {
        int n = adj.size();

        stack<int>order;
        vector<int>vis(n);

        for(int i=0;i<n;i++){
            if(vis[i]) continue;
            finishTimeDFS(adj,vis,i,order);
        }

        vector<vector<int>>radj(n);

        for(int i=0;i<n;i++){
            for(auto ele:adj[i]){
                radj[ele].push_back(i);
            }
        }

        vis.assign(n,0);

        vector<vector<int>>ans;

        while(!order.empty()){
            int i = order.top();
            order.pop();

            if(vis[i]) continue;

            vector<int>keep;
            dfs(radj,vis,i,keep);

            ans.push_back(keep);

        }

        return ans.size();
    }
};
```
