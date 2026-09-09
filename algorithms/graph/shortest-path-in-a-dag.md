# Shortest Path in a DAG

```cpp
const int INF = 1e9;

class Solution {
  public:
    vector<int> shortestPath(int v, int e, vector<vector<int>>& edges) {
        vector<vector<pair<int,int>>>adj(v);
        vector<int>in(v);

        for(auto ele:edges){
            adj[ele[0]].push_back({ele[1],ele[2]});
            in[ele[1]]++;
        }

        queue<int>q;
        vector<int>topo;

        for(int i=0;i<v;i++){
            if(!in[i]) q.push(i);
        }

        while(!q.empty()){
            int u = q.front();
            q.pop();

            topo.push_back(u);

            for(auto &[ve,w]:adj[u]){
                in[ve]--;
                if(!in[ve]){
                    q.push(ve);
                }
            }
        }

        vector<int>dist(v,INF);
        dist[0]=0;

        for(auto u:topo){
            for(auto &[ve,w]:adj[u]){
                dist[ve] = min(dist[ve],dist[u]+w);
            }
        }

        for(auto &ele:dist) ele=ele==INF?-1:ele;

        return dist;
    }
};
```
