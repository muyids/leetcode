# 状态压缩dp

状态压缩dp，用整数来描述一个集合从而达到节省时间空间，让代码更加的好写

整数的**二进制**表示状态，通过位运算进行状态转换

## 旅行商问题

旅行商问题`（Traveling Salesman Problem）`,简称TSP问题

问题描述：

n个点，m条边，找出最短的回路

题目练习:

- [旅行商问题](https://ac.nowcoder.com/acm/contest/547/E)

### 算法1

#### 暴力枚举

假设有1，2，3，4，5五个点

枚举所有排列：

```cpp
1 —> 2 -> 3 -> 4 -> 5
1 —> 2 -> 3 -> 5 -> 4
1 —> 2 -> 4 -> 3 -> 5
1 —> 2 -> 4 -> 5 -> 3 
...
5 —> 4 -> 3 -> 2 -> 1 
```

#### 时间复杂度

$$O(n!)$$

### 算法2

#### 状态压缩DP

枚举所有排列存在重复计算的问题

集合用S表示，dp[S][i]表示走过了S集合，到达位置i的最小代价

比如: 集合U(1,3,4)停留在位置3，S=01101表示集合U(1,3,4),状态表示为dp[01101][3]

状态转换：

i->j的转换过程：`dp[S|1<<j][i] = min(dp[S][i]+(i,j), dp[S|1<<j][i])`

#### 时间复杂度

$$O(2^n)$$

#### 代码实现

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = (1 << 16) + 10;
int n, m; // n 个点，m条边
int dp[N][16];
int dis[16][16];

int main() {
    cin >> n >> m; 
    while (m--) {
        int u, v, w;
        cin >> u >> v >> w;
        dis[u][v] = w;
        dis[v][u] = w;
    }
    memset(dp, 0, sizeof dp);
    memset(dis, 0x3f, sizeof dis);

    int M = (1 << n) - 1;
    for (int i = 0; i < n; i++)
        for (int j = 0; j <= M; j++)
            dp[i][j] = 1e9;
    dp[0][1] = 0;
    for (int s = 1; s < M; s++) // 枚举所有状态
        for (int i = 0; i < n; ++i) // 枚举n个城市
            for (int j = 0; j < n; ++j) // i -> j
                if (!(s >> j & 1)) { // 如果当前城市j还没有经过,我们从i走向j
                    int next = s | (1 << j);
                    if (next == M)
                        dp[j][next] = min(dp[j][next], dp[i][s] + dis[i][j] + dis[j][0]);
                    else
                        dp[j][next] = min(dp[j][next], dp[i][s] + dis[i][j]);
                }
    int ans = 1e9;
    for (int i = 1; i < n; i++)
        ans = min(ans, dp[i][M]);
    cout << ans << endl;
    return 0;
}
```

## P和NP

- P问题(Polynomial): 时间复杂度都可以用O（n^k）来表示，k是一个常数，**多项式时间算法**
- NP问题(Non-deterministic Polynomial): 意思是“不确定是否能用多项式时间解决”，时间复杂度：O(2^n),甚至O（n!）, 这些时间复杂度随着问题规模n的增长，计算量的增长速度是非常恐怖的

`NP = P？`

有些科学家认为，所有的NP问题终究都可以在多项式时间内解决，只是我们暂时还没有找到方法；也有些科学家认为，某些NP问题永远无法在多项式时间内解决。这个业界争论可以用一个公式来表达：`NP = P？`

## 归约和NPC

归约的定义：只要有办法解决Q'，就一定能够解决Q，则称：问题Q归约于问题Q'

归约可以逐级传递，比如问题A归约于问题B，问题B归约于问题C，问题C归约于问题D，那么我们可以说问题A归约于问题D

NPC问题（NP-complete）：存在归约关系的NP问题，可以用归约的方式求解

就数量上而言，NP问题远比P问题要多，而NP之中的NPC问题也仅占极少数，所以P、NP、NPC之间的关系可以用下图来表示：

![np-p-npc](https://muyids.oss-cn-beijing.aliyuncs.com/p-np-npc.png)

旅行商问题就是一个`NPC`问题

## 题目

- [AcWing91.最短Hamilton路径（最短哈密顿距离）](https://www.acwing.com/problem/content/93/)

- [AcWing327.玉米田](https://www.acwing.com/problem/content/description/329/)

- [LeetCode 464. Can I Win (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/401-500/464.can-i-win.md)

- [LeetCode 526. Beautiful Arrangement (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/501-600/526.beautiful-arrangement.md)

- [LeetCode 935. Knight Dialer (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/901-1000/935.knight-dialer.md)

- [LeetCode 1125. Smallest Sufficient Team (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/1101-1200/1125.smallest-sufficient-team.md)

- [LeetCode 1349. Maximum Students Taking Exam (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/1301-1400/1349.maximum-students-taking-exam.md)