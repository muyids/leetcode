# Bellman-Ford算法

## 算法思路

n个点，m条边

- 循环n次
  - 遍历所有边**u->v,权w** (松弛操作)
    - dist[v]=min(dist[v], dist[u]+w)

## 应用

- 处理有负权边的图
- 循环次数的含义：循环K次后，表示不超过K条边的最短距离
- 有边数限制的最短路，只能用Bellman-Ford算法，不能用spfa算法
- 如果有负权回路，最短路不一定存在
  -![负权回路](https://muyids.oss-cn-beijing.aliyuncs.com/graph-circle-un.png)
- Bellman-Ford算法可以求出是否有**负环**
  - 第n循环后，还有更新，说明路径上有n+1个点，也就是存在环，还有更新，说明环是负环
- 循环n次后, 所有的边`u->v,权w`满足三角不等式:`dist[v]<=dist[u]+w`

## 代码实现

- [LeetCode 787. Cheapest Flights Within K Stops (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/701-800/787.cheapest-flights-within-k-stops.md)

Bellman-Ford算法

```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int K) {
        const int INF = 0x3f3f3f3f;
        vector<int> dist(n, INF); // 到起点的最短距离
        vector<int> backup(n); // 防止串联

        dist[src] = 0;
        for (int i = 0; i<= K; i++){ // 松弛K次
            backup.assign(dist.begin(), dist.end());
            for (auto &f: flights){ // 枚举所有边
                dist[f[1]] = min(dist[f[1]], backup[f[0]] + f[2]); // 更新最短路
            }
        }
        if (dist[dst] > INF /2) return -1;
        return dist[dst];
    }
};
```




