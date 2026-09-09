# Bipartite Graph Check (BFS)

```cpp
class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int>color(n,-1);

        for(int i=0;i<n;i++){
            if(color[i]!=-1) continue;

            queue<pair<int,int>>q;
            q.push({i,0});
            color[i]=0;

            while(!q.empty()){
                auto [curr,col] = q.front();
                q.pop();

                for(auto ele:graph[curr]){
                    if(color[ele]!=-1){
                        if(color[ele]!= !col) return false;
                        continue;
                    }

                    color[ele]=!col;
                    q.push({ele,!col});
                }
            }
        }

        return true;
    }
};
```
