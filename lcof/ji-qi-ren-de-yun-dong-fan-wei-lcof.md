地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？

 
```cpp
示例 1：

输入：m = 2, n = 3, k = 1
输出：3
示例 1：

输入：m = 3, n = 1, k = 0
输出：1

```

提示：

- 1 <= n,m <= 100
- 0 <= k <= 20

---

## dfs+dp

## 代码实现

```cpp
class Solution {
public:
    int ans = 0;
    int f[100];
    int g[100][100];
    int dirs[5] = {0, -1, 0, 1, 0};
    int k, m, n;
    int movingCount(int _m, int _n, int _k) {
        m=_m;
        n=_n;
        k = _k;
        memset(g, 0, sizeof g);
        memset(f, 0, sizeof f);
        for (int i = 1; i <100; i++)f[i] = i %10 + f[i/10]; // dp求和
        dfs(0, 0);
        return ans;
    }

    void dfs(int i, int j){
        if (f[i] + f[j] > k) return;
        if (g[i][j]) return;
        g[i][j] = 1;
        ans++;
        for (int d = 0; d < 4; d++){
            int x = i + dirs[d], y = j+ dirs[d+1];
            if (x >=0 && x < m && y>=0 && y< n && !g[x][y]){
                dfs(x, y);
            }
        }
    }
};
```

