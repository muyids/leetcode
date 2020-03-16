# Floyd算法

多源汇最短路

- for (k = 1; k<=n ; k++)
  - for (i = 1; i<= n; i++)
    - for (j = 1; j<=n; j++)
      - d[i,j] = min(d[i,j], d[i,k]+d[k,j]) 

## 算法原理

floyd算法是基于动态规划的

d[k, i, j] 表示 从i出发，只经过1~k到达j点的最短距离

## 题目

- AcWing 854. Floyd求最短路


```cpp
#include <bits/stdc++.h>
using namespace std;

const int INF = 0x3f3f3f3f;
const int N = 210;
int n, m, k; // n个点，m条边，k次询问
int grid[N][N]; // 图的矩阵存储
int d[N][N]; // 最短距离

void floyd(){
    for (int k = 1; k <=n; k++)
        for (int i = 1; i<=n; i++)
            for (int j = 1; j<=n; j++)
                d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
}

int main(){
    cin >> n >> m >> k;
    for (int i = 1; i <=n ; i++){ // 初始化邻接矩阵
        for (int j = 1; j<=n; j++){
            if (i == j) d[i][i] = 0; // 自己到自己距离0
            else d[i][j] = INF; // 到别的点距离正无穷
        }
    }
    int u, v, w;
    while (m--){ // m条边
        cin >> u >> v >> w;
        d[u][v] = min(d[u][v], w); // 重边取最小
    }
    floyd(); // floyd计算多源最短路
    while (k--){ // k次询问
        cin >> u >> v;
        if (d[u][v] > INF/2) puts("impossible");
        // 由于存在负权边，所以比INF/2大，就是不可达
        else cout << d[u][v] << endl;
    }
    return 0;
}
```