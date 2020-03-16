# Kruskal算法

- 将所有边按权重从小到大排序 O(mlogm)
- 枚举每条边`u <--> v`,权重w
  - if a,b不连通
    - 将这条边加入集合中

## 应用场景

稀疏图的 最小生成树

## 代码实现

- AcWing 859. Kruskal算法求最小生成树

```cpp
/*
res 最小生成树中的权重之和
cnt 当前加了多少条边
1.将所有边按权重排序O(mlogm)
2.枚举每条边（并查集应用） 
    if a,b 不连通
        加入集合
3.需重载< 
bool operator < (const Edge &C) const {
    return w < C.w;
}
*/
#include<bits/stdc++.h>
using namespace std;

const int N = 1e5+10, M = 2e5+10, INF = 0x3f3f3f3f;
int n, m; // n个点，m条边
int f[N]; // 并查集
struct Edge{
    int u, v, w;
    bool operator < (const Edge&e) const{
        return w < e.w; // 按权重从小到大排序
    }
}edges[M]; 

int find(int x){
    if (x == f[x]) return x;
    return f[x] = find(f[x]);
}

int kruskal(){
    sort(edges, edges+m);
    for (int i =0; i<= n; i++)f[i] = i; // 初始化并查集
    
    int res = 0, cnt = 0; // res:最小生成树权重之和；cnt:增加了多少条边
    for (int i = 0; i <m; i++){
        auto e = edges[i];
        int p = find(e.u), q = find(e.v);
        if (p != q){
            f[q] = p;
            res += e.w;
            cnt++;
        }
    }
    if (cnt < n-1) return INF;
    return res;
}

int main(){
    cin >> n >> m;
    int u, v, w;
    for(int i = 0; i<m; i++){
        cin >> u >> v >> w;
        edges[i] = {u, v, w};
    }
    
    int ans = kruskal();
    if (ans > INF/2) puts("impossible");
    else cout << ans << endl;
    
    return 0;
}
```
