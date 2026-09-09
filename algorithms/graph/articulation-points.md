# Articulation Points

```cpp
// User function Template for C++

/*
- In this algo we keep track of insertion time of a node and lowest time within which it can be reached
*/

class Solution {
    int timer = 0;
  public:
    void dfs(vector<int> adj[], vector<int> &tin, vector<int> &low, vector<int> &vis, vector<int> &mark, int u, int par){
        vis[u]=1;
        tin[u]=low[u]=timer;
        timer++;
        int child = 0; // keep track of unvisited children
        for(auto v:adj[u]){
            if(v==par) continue;

            if(!vis[v]){
                dfs(adj,tin,low,vis,mark,v,u);
                low[u] = min(low[u],low[v]);
                if(low[v]>=tin[u] && par!=-1){
                    mark[u]=1;
                }
                child++;
            }else{
                low[u] = min(low[u],tin[v]);
            }
        }

        if(child>1 && par==-1){
            if(adj[u].size()>1){
                mark[u]=1;
            }
        }

        return;
    }

    vector<int> articulationPoints(int v, vector<int> adj[]) {
        vector<int>mark(v);

        vector<int>low(v,-1);
        vector<int>tin(v,-1);
        vector<int>vis(v);

        for(int i=0;i<v;i++){
            if(vis[i]) continue;
            dfs(adj,tin,low,vis,mark,0,-1);
        }

        vector<int>ans;

        for(int i=0;i<v;i++){
            if(mark[i]){
                ans.push_back(i);
            }
        }

        if(ans.size()==0){
            return {-1};
        }

        return ans;
    }
};
```
