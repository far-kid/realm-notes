# Topological Sort (DFS)

```cpp
class Solution {
  public:
    void dfs(vector<vector<int>>&adj, vector<int>&vis, stack<int>&st, int curr){
        if(vis[curr]) return;
        vis[curr]=1;

        for(auto ele:adj[curr]){
            dfs(adj,vis,st,ele);
        }

        st.push(curr);

        return;
    }

    vector<int> topoSort(int v, vector<vector<int>>& edges) {

        vector<vector<int>>adj(v);

        for(auto ele:edges){
            adj[ele[0]].push_back(ele[1]);
        }

        vector<int>vis(v,0);
        stack<int>st;

        for(int i=0;i<v;i++){
            if(vis[i]) continue;
            dfs(adj,vis,st,i);
        }

        vector<int>ans;

        while(!st.empty()){
            ans.push_back(st.top());
            st.pop();
        }

        return ans;
    }
};
```
