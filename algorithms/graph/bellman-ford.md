# Bellman-Ford Algorithm

```cpp
// User function Template for C++

class Solution {
  public:
    vector<int> bellmanFord(int v, vector<vector<int>>& edges, int src) {
        vector<int>dist(v,1e8);
        dist[src]=0;

        int n = edges.size();

        for(int j=0;j<v-1;j++){
            for(int i=0;i<n;i++){
                int u = edges[i][0], v = edges[i][1], w = edges[i][2];
                if(dist[u]==1e8) continue;
                if(dist[u]+w<dist[v]){
                    dist[v]=dist[u]+w;
                }
            }
        }

        for(int i=0;i<n;i++){
            int u = edges[i][0], v = edges[i][1], w = edges[i][2];
            if(dist[u]==1e8) continue;
            if(dist[u]+w<dist[v]){
                return {-1};
            }
        }

        return dist;
    }
};
```
