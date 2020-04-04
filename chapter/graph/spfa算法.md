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

## spfa算法步骤

- queue <– 起始点
- while queue 不为空
  - t <– 队头
    - queue.pop()
  - 用 t 更新所有出边 t –> v，权值为w
    - queue <– v (若该点被更新过，则拿该点更新其他点)

时间复杂度: `一般：O(m) 最坏：O(nm)`

## 场景

- 存在负权边，求单源最短路
- spfa也能解决权值为正的图的最短距离问题，且一般情况下比Dijkstra算法还好
- spfa算法更为通用，在求单源最短路的时候，我们可以先考虑spfa算法，如果数据被卡，再考虑实现别的单源最短路算法；一般笔面试题数据都不会被卡，OI，ACM可能被卡

## 代码实现

- [LeetCode 743. Network Delay Time (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/701-800/743.network-delay-time.md)

spfa算法

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int N, int K) {
        const int INF = 0x3f3f3f3f;
        vector<int> dist(N+1, INF); // 保存到起点的距离
        vector<bool> st(N+1, false); // 是否最短
        typedef pair<int, int> PII;
        unordered_map<int, vector<PII>> edges; // 邻接表

        queue<int> q;
        q.push(K);
        dist[K] = 0;
        st[K] = true; // 已经在队列中

        for (auto &t: times){
            edges[t[0]].push_back({t[1], t[2]});
        }

        while (!q.empty()){
            auto t = q.front();
            q.pop();
            st[t] = false;
            for (auto &e: edges[t]){
                int v = e.first, w = e.second;
                if (dist[v] > dist[t] + w){
                    dist[v] = dist[t] + w;
                    if (!st[v]){
                        q.push(v);
                        st[v] = true;
                    }
                }
            }
        }
        int ans = *max_element(dist.begin()+1, dist.end());
        return ans == INF ? -1: ans;
    }
};
```

## spfa算法求负环

- Acwing 852. spfa判断负环

### 算法思路

- 增加`cnt[N]`来记录最短路的边数
- 当最短路的边数大于等于n，可知经过的点大于等于n+1
- 一共n个点，根据抽屉原理可知**最短路存在负环**

### 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef pair<int, int> PII;
unordered_map<int, vector<PII>> edges; // 邻接表
int n, m; // n个点，m条边
const int N = 2010;
int dist[N]; // 到起始点的最小距离
bool st[N];  // 在队列中是否存在
int cnt[N]; // 记录最短路的边数

bool spfa(){
    queue<int> q;
    for (int i = 1; i <=n; i++){ // 所有点入队列；负环可能存在在所有点出发的最短路上
        q.push(i);
        st[i] = true;
    }
    
    while (!q.empty()){
        int u = q.front();
        q.pop();
        st[u] = false; // 不在队列
        
        for (auto &e: edges[u]){
            int v = e.first, w = e.second;
            if (dist[v] > dist[u] + w){
                dist[v] = dist[u] + w; // 更新最短路 权值
                cnt[v] = cnt[u] + 1; // 更新经过的边数
                // 存在负环；边数>=n,经过的点>=n+1;根据抽屉原理得，最短路存在负环
                if (cnt[v] >= n) return true; 
                if (!st[v]){
                    q.push(v);
                    st[v] = true;
                }
            }
        }
    }
    return false;
}

int main(){
    cin >> n >> m;
    while (m--){ // 构造图
        int u, v, w; 
        cin >> u>> v>> w;
        edges[u].push_back({v, w});
    }
    if (spfa()) puts("Yes");
    else puts("No");
    return 0;
}
```

