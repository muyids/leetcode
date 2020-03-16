# Prim算法

- dist[i] <- 正无穷
- for (i=0; i < n; i++) // 迭代n次，加入n个点
  - t <- 找到集合外距离最近的点
  - 用 t 更新其他点到集合的距离
  - s[t] = true

## 朴素版Prim算法

### 代码实现

- Acwing 858. Prim算法求最小生成树

```cpp
/*
S:当前已经在联通块中的所有点的集合
1. dist[i] = inf
2. for n 次
    t<-S外离S最近的点
    利用t更新S外点到S的距离
    st[t] = true
n次迭代之后所有点都已加入到S中
联系：Dijkstra算法是更新到起始点的距离，Prim是更新到集合S的距离
*/
#include<bits/stdc++.h>
using namespace std;

const int N = 510, INF = 0x3f3f3f3f;

int n, m; // n个点，m条边
int g[N][N];// 邻接矩阵
int dist[N]; // 存储其他点到S的距离
bool st[N]; // 是否已得到最短距离

int prim(){
    memset(dist, INF, sizeof dist);
    int res = 0;// 如果图不连通，返回INF，否则返回res
    
    for (int i = 0; i<n; i++){ // n次迭代，将n个点加入集合
        int t = -1; // 找到距离集合最近的点
        for (int j =1; j <= n; j++){
            if (!st[j] && (t == -1 || dist[t] > dist[j])){
                t = j;
            }
        }
        // 找到了距离集合S 最近的点t
        if (i && dist[t] == INF) return INF; // 不连通
        
        if (i) res += dist[t];
        st[t] = true;
        
        // 更新到集合S的最短距离
        for (int j = 1; j <=n; j++) dist[j] = min(dist[j], g[t][j]);
    }
    return res;
}


int main(){
    cin >> n >> m;
    for (int i = 1; i <=n ;i++){
        for (int j = 1; j <=n; j++){
            if (i == j) g[i][j] = 0;
            else g[i][j] = INF;
        }
    }
    int u, v, w;
    while (m--){
        cin >> u >> v>> w;
        g[u][v] = g[v][u] = min(g[u][v], w);
    }
    int t = prim();
    if (t == INF) puts("impossible");
    else cout << t << endl;
    return 0;
}
```

### 时间复杂度

朴素版Prim O(n^2) 

适用于`稠密图`

## 堆优化版Prim算法

基本不用，只需要掌握 **朴素版Prim算法** 和 **Kruskal算法**





