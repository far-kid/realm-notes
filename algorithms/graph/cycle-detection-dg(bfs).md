# Cycle Detection in a Directed Graph (BFS)

```cpp
class Solution {
  public:
    bool isCyclic(int v, vector<vector<int>> &edges) {
        vector<vector<int>>adj(v);
        vector<int>indegree(v);
        
        for(auto ele:edges){
            adj[ele[0]].push_back(ele[1]);
            indegree[ele[1]]++;
        }
        
        queue<int>q;
        
        for(int i=0;i<v;i++){
            if(indegree[i]==0){
                q.push(i);
            }
        }
        
        while(!q.empty()){
            int curr = q.front();
            q.pop();
            
            for(auto ele:adj[curr]){
                indegree[ele]--;
                if(indegree[ele]==0){
                    q.push(ele);
                }
            }
        }
        
        for(auto ele:indegree){
            if(ele>0) return true;
        }
        
        return false;
    }
};
```
