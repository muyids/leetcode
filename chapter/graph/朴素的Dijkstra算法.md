# 朴素的Dijkstra算法

集合S：当前已经确定最短距离的点

- dist[1] = 0, dist[i] = 正无穷
- for v: 1 ~ n
  - t <- 不在s中的距离最近的点
  - s <- t
  - 用t更新其他点的距离

朴素的Dijkstra算法往往是稠密图，用邻接矩阵来存储

## 算法模板

```cpp
int g[N][N];  // 存储每条边；为稠密阵所以用邻接矩阵存储
int dist[N];  // 存储1号点到每个点的最短距离
bool st[N];   // 存储每个点的最短路是否已经确定

// 求1号点到n号点的最短路，如果不存在则返回-1
int dijkstra()
{
    memset(dist, 0x3f, sizeof dist); //初始化距离  0x3f代表无限大
    dist[1] = 0; //第一个点到自身的距离为0

    for (int i = 0; i < n-1; i ++) //有n个点所以要进行n-1次迭代;第一个到自身距离为0
    {
        int t = -1;     // 在还未确定最短路的点中，寻找到1号点距离最小的点
        for (int j = 1; j <= n; j ++)
            if (!st[j] && (t == -1 || dist[t] > dist[j]))
                t = j;

        st[t] = true; // t号点的最短路已经确定

        // 用t更新其他点的距离
        for (int j = 1; j <= n; j ++ )
            dist[j] = min(dist[j], dist[t] + g[t][j]);
    }

    if (dist[n] == 0x3f3f3f3f) return -1;
    return dist[n];
}
```

时间复杂是 O(n2+m), n 表示点数，m 表示边数

## 题目

### AcWing849. Dijkstra求最短路 I

### [LeetCode743.Network Delay Time](https://github.com/muyids/leetcode/blob/master/algorithms/701-800/743.network-delay-time.md) (medium)


