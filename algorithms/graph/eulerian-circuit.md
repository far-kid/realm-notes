# Eulerian Circuit

A path that:
- Uses every edge exactly once
- Starts and ends at the same node

## For an Undirected Graph

Conditions:
- Graph must be connected (ignoring isolated nodes)
- All vertices must have even degree

## For a Directed Graph

Conditions:
- in-degree == out-degree for every node

```cpp
const int N = 100005;
vector<pair<int,int>> adj[N];
bool used[N];
vector<int> circuit;

void dfs(int u) {
    while (!adj[u].empty()) {
        auto [v, id] = adj[u].back();
        adj[u].pop_back();

        if (used[id]) continue;
        used[id] = true;

        dfs(v);
    }
    circuit.push_back(u);
}

reverse(circuit.begin(),circuit.end());
```
