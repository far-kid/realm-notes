# Longest Path in a Graph from a Source

```cpp
int longestPath(int v, vector<vector<int>>& edges, int src) {

    vector<vector<pair<int,int>>>adj(v);
    vector<int>indegree(v);

    for(auto ele:edges){
        adj[ele[0]].push_back({ele[1],ele[2]});
        indegree[ele[1]]++;
    }

    queue<int>q;

    for(int i=0;i<v;i++){
        if(!indegree[i]){
            q.push(i);
        }
    }

    vector<int>dist(v,INT_MIN);
    dist[src]=0;

    while(!q.empty()){
        int u = q.front();
        q.pop();

        for(auto [neigh,w]:adj[u]){

            if(dist[u]!=INT_MIN){
                if(dist[neigh]<dist[u]+w){
                    dist[neigh] = dist[u]+w;
                }
            }

            indegree[neigh]--;
            if(!indegree[neigh]) q.push(neigh);
        }
    }

    return *max_element(dist.begin(),dist.end());

}
```
