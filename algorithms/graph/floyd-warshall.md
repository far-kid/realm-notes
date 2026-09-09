# Floyd-Warshall Algorithm

```cpp
const int INF = 1e9+7;
class Solution {
public:
    int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {

        vector<vector<int>>adj(n,vector<int>(n,INF));

        for(auto ele:edges){
            adj[ele[0]][ele[1]] = ele[2];
            adj[ele[1]][ele[0]] = ele[2];
        }

        for(int i=0;i<n;i++){
            adj[i][i]=0;
        }

        for(int k=0;k<n;k++){
            for(int i=0;i<n;i++){
                for(int j=0;j<n;j++){
                    if(adj[i][k]==0 || adj[k][j]==0) continue;
                    adj[i][j] = min(adj[i][j],adj[i][k]+adj[k][j]);
                }
            }
        }

        int mnCnt=INT_MAX;
        int city=-1;

        for(int i=0;i<n;i++){
            int cnt=0;
            for(int j=0;j<n;j++){
                if(adj[i][j]<=distanceThreshold) cnt++;
            }

            if(cnt<=mnCnt){
                mnCnt = cnt;
                city = i;
            }
        }

        return city;
    }
};
```
