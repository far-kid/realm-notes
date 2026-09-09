# Tarjan's Algorithm: Bridges

```cpp
/*
In this algo we keep track of insertion of node and the minimum time we can reach that node from other node
*/
class Solution {
    int timer=0;
public:
    void dfs(vector<vector<int>> &adj, vector<int> &time, vector<int> &ltime,vector<vector<int>> &ans, int node,int par){
        time[node] = timer;
        ltime[node] = timer;
        timer++;

        for(int v:adj[node]){
            if(v==par) continue;

            if(time[v]==-1){
                dfs(adj,time,ltime,ans,v,node);
                ltime[node] = min(ltime[node],ltime[v]);
                if(ltime[v]>time[node]){
                    ans.push_back({v,node});
                }
            }else{
                ltime[node] = min(ltime[node],ltime[v]);
            }
        }


        return;
    }

    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        vector<int>time(n,-1);
        vector<int>ltime(n,INT_MAX);

        vector<vector<int>>adj(n);

        for(auto connection:connections){
            adj[connection[0]].push_back(connection[1]);
            adj[connection[1]].push_back(connection[0]);
        }

        vector<vector<int>>ans;

        for(int i=0;i<n;i++){
            if(time[i]!=-1) continue;
            dfs(adj,time,ltime,ans,i,-1);
        }

        return ans;
    }
};
```
