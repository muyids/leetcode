# spfa算法

在各个方面都好于Bellman-Ford算法

但是不能求**有边数限制的最短路**

SPFA算法是单源最短算法中限制最小的算法，只要没有负环，就可以用SPFA算法，一般的只要求最短路就不含有负环

SPFA算法是对Bellman-Ford算法的优化

## 算法思路

n个点，m条边

对Bellman-Ford算法进行优化：

- 循环n次
  - 遍历所有边**u->v,权w** (松弛操作)
    - `dist[v]=min(dist[v], dist[u]+w)` ; 只有dist[u]变小了，dist[v]才会变小

spfa算法步骤

- queue <– 1
- while queue 不为空
  - t <– 队头
    - queue.pop()
  - 用 t 更新所有出边 t –> b，权值为w
    - queue <– b (若该点被更新过，则拿该点更新其他点)

时间复杂度 一般：O(m)O(m) 最坏：O(nm)
