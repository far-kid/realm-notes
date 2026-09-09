# Bipartite Graph Check (DFS)

```cpp
class Solution {
public:
    bool dfs(vector<vector<int>>& graph, vector<int>& color, int curr, int col){
        if(color[curr]!=-1){
            if(color[curr]==col) return true;
            else return false;
        }

        color[curr] = col;

        for(auto ele:graph[curr]){
            if(!dfs(graph,color,ele,!col)) return false;
        }

        return true;
    }

    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();

        vector<int>color(n,-1);


        for(int i=0;i<n;i++){
            if(color[i]!=-1) continue;

            if(!dfs(graph,color,i,0)) return false;
        }

        return true;
    }
};
```
