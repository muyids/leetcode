# 背包dp

**背包问题是一类动态规划问题**

对于背包问题的学习，推荐看下[dd大牛的《背包九讲》](https://www.cnblogs.com/jbelial/articles/2116074.html)

## 背包问题分类

* [01背包问题](#01背包问题) 每件物品最多用1次
* [完全背包问题](#完全背包问题) 每件物品有无限个
* [多重背包问题](#多重背包问题) 每种物品有Si个
* [分组背包问题](#分组背包问题) 一组里面只能选一种
* [混合背包问题](#混合背包问题)
* [二维费用的背包问题](#二维费用的背包问题)
* [背包问题求方案数](#背包问题求方案数)
* [求背包问题的方案](#求背包问题的方案)
* [有依赖的背包问题](#有依赖的背包问题)

我们重点掌握常用的背包四讲，即：**01背包、完全背包、多重背包、分组背包**

## 01背包问题

每个物品有一定价值和容量，要么取要么不取，只能取一次

* 有 N 件物品和一个容量是 V 的背包。每件物品只能使用一次。
* 第 i 件物品的体积是 vi，价值是 wi。
* 求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。
* 输出最大价值。

```cpp
输入：
N 件物品
V 容量
v[N] 体积
w[N] 价值
```

### 算法思路

01背包是最基础的背包问题，特点是：每种物品仅有一件，可以选择放或不放。

我们可以选择二维或一维解决01背包

#### 二维解决01背包

dp[i][j] 表示前i种物品，体积为j能放下的最大价值

#### 一维解决01背包

dp[j]表示体积为j能放下的最大价值

代码实现

```javascript
function maxValue(N, V, v, w) {
    let dp = new Array(V + 1).fill(0)
    for (let i = 0; i < N; i++) { // 循环物品
        for (let j = V; j >= v[i]; j--) { // 循环体积；从大到小；
            dp[j] = Math.max(dp[j], dp[j - v[i]] + w[i])
        }
    }
    return dp[V]
}
```

只用一维数组解01背包问题是十分必要的。我们最常使用的也是一维的方式。

### 题目

* [LeetCode 300. Longest Increasing Subsequence (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/201-300/300.longest-increasing-subsequence.md)

* [LeetCode 416. Partition Equal Subset Sum (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/401-500/416.partition-equal-subset-sum.md)

### 总结

01背包问题是最基本的背包问题，它包含了背包问题中设计状态、方程的最基本思想，
另外，别的类型的背包问题往往也可以转换成01背包问题求解。
故一定要仔细体会上面基本思路的得出方法，状态转移方程的意义，以及最后怎样优化的空间复杂度。

## 完全背包问题

在01背包基础上，每个物品可以取无数次

* 有 N 种物品和一个容量是 V 的背包，每种物品都有无限件可用。
* 第 i 种物品的体积是 vi，价值是 wi。
* 求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。
* 输出最大价值。

---

dp[i]表示总体积为i的情况下的最大价值

代码模板

```javascript
function maxValue(N, V, v, w) {
    let dp = new Array(V + 1).fill(0)
    for (let i = 0; i < N; i++) { // 循环物品
        for (let j = v[i]; j <= V; j++) { // 循环体积；从小到大；跟01背包问题反过来，表示v[i]可以取多次
            dp[j] = Math.max(dp[j], dp[j - v[i]] + w[i])
        }
    }
    return dp[V]
}
```

## 多重背包问题

每种物品有一个固定取数的上限

* 有 N 种物品和一个容量是 V 的背包。
* 第 i 种物品最多有 si 件，每件体积是 vi，价值是 wi。
* 求解将哪些物品装入背包，可使物品体积总和不超过背包容量，且价值总和最大。
* 输出最大价值。

```cpp
输入样例
4 5
1 2 3
2 4 1
3 4 3
4 5 2

输出样例：
10
```

数据范围

```cpp
0<N,V≤100
0<vi,wi,si≤100
```

---

f[i] 表示总体积是i的情况下的最大价值；

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 110;
int n, m;
int f[N];

int main(){
    cin >> n >> m;
    for (int i = 0; i<n; i++){
        int v, w, s;
        cin >> v >> w >> s;
        for (int j = m; j >= 0; j--){
            for (int k =1; k<=s && k * v<= j; k++){ // 01背包问题加一层循环
                f[j] = max(f[j], f[j - k *v] + k* w);
            }
        }
    }

    cout << f[m] << endl;
    return 0;
}
```

### 多重背包的二进制优化

数据范围

```cpp
0<N≤1000
0<V≤2000
0<vi,wi,si≤2000
```

如果上面数据范围仍按照三维循环去求解，时间复杂度将会达到2e9，会TLE

优化方法：通过把物品件数拆为二进制份，转化为01背包问题求解

**二进制拆分算法**：

* 比如10个物品，我们可以拆成 `1，2，4 和 3（10-1-2-4得到）`，则`1，2，4，3`可以组合得到1到10的所有数字，
* 如何证明?

证明：s分为两部分 1,2,4,8,...,2^k 和 `s - 2^k`,前半部分，我们可以通过二进制表示证明1到2^k都可取，剩下部分`s - 2^k`的取值范围在[0,2^k)之间，我们可以想象把后半部分移到前面，前半部分移到后面，可以得到后半部分的任意取值也都可以得到

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 2010;
int n, m;
int f[N] = {0};

struct Good {
    int v, w;
};

int main(){
    cin >> n >> m;
    vector<Good> goods;
    for (int i = 0; i< n; i++){
        int v, w, s;
        cin >> v >> w >> s;
        for (int k = 1; k <= s; k *= 2){
            s -= k;
            goods.push_back({v*k, w*k}); // 将多重背包打包成了经过二进制拆分的包裹
        }
        if (s > 0) goods.push_back({v*s, w*s});
    }

    for (auto good: goods){
        for (int j = m; j >= good.v; j--){
            f[j] = max(f[j], f[j - good.v] + good.w);
        }
    }

    cout << f[m] << endl;
    return 0;
}
```

多重背包的单调队列优化（参考[楼教主--男人八题](https://www.cnblogs.com/dramstadt/p/3439725.html))

## 分组背包问题

每组物品有若干，同组内的物品只能选一个

* 有 N 组物品和一个容量是 V 的背包。
* 每组物品有若干个，同一组内的物品最多只能选一个。
* 每件物品的体积是 vij，价值是 wij，其中 i 是组号，j 是组内编号。
* 求解将哪些物品装入背包，可使物品总体积不超过背包容量，且总价值最大。
* 输出最大价值。

```cpp
输入格式
第一行有两个整数 N，V，用空格隔开，分别表示物品组数和背包容量。

接下来有 N 组数据：

每组数据第一行有一个整数 Si，表示第 i 个物品组的物品数量；
每组数据接下来有 Si 行，每行有两个整数 vij,wij，用空格隔开，分别表示第 i 个物品组的第 j 个物品的体积和价值；

输出格式
输出一个整数，表示最大价值。
```

### 算法思路

f[i,j] 只从前i组物品中选，且总体积不大于j的所有做法

对于第i组，不选，选第1个物品，选第2个物品，…, 选第k个物品

枚举第k个：`f[i,j] = max(f[i][j], f[i-1][j-v[i][k]] + w[i][k]);`

用的是上层状态则从大到小枚举，用的是本层状态则从小到大枚举

### 代码实现

```cpp
// 当没有思路时，回到最初的步骤去思考应该如何做
// f[i,j] 只从前i组物品中选，且总体积不大于j的所有选法的最大值
// f[i,j] 最多选一个，那么可以不选，选a, 选b, 选c, 等等
// f[i,j] = max(f[i-1,j], f[i-1,j-v[k]]+w[k]) 上层从大到小枚举

#include <iostream>
#include <algorithm>

using namespace std;
const int N = 110;

int n, m;
int v[N][N], w[N][N], s[N];
int f[N];

int main() {
    cin >> n >> m;

    for (int i = 1; i <= n; i ++) {
        cin >> s[i]; // 
        for (int j = 0; j < s[i]; j ++)
            cin >> v[i][j] >> w[i][j];
    }

    for (int i = 1; i <= n; i ++) // 枚举物品
        for (int j = m; j >= 0; j --) // 枚举体积
            for (int k = 0; k < s[i]; k ++) // 枚举第k组
                if (j >= v[i][k]) // 务必使其有意义；第i组第k个物品
                    f[j] = max(f[j], f[j - v[i][k]] + w[i][k]);

    cout << f[m] << endl;
    return 0;
}
```

## 混合背包问题

## 二维费用的背包问题

对于每件物品，具有两种不同的费用，存在两种不同的限制。一般形式是对物品总数的限制。

## 背包问题求方案数

有1分，2分，5分，10分四种硬币，每种硬币数量无限，给定n分钱(n <= 100000)，有多少中组合可以组成n分钱？

```cpp
输入例子1:
13

输出例子1:
16
```

算法思想：将状态由最大价值改为方案数

## 求背包问题的方案

算法思想：

1. 记忆化存储最优解的转换过程
2. 逆推得到最优解

### 题目

* [LeetCode 368. Largest Divisible Subset (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/301-400/368.largest-divisible-subset.md)

## 有依赖的背包问题

N个物品，有重量数组w,和价值数组v,背包承重为M

* 求背包能装的最大重量（领扣92）
* 求背包能装的最大价值 (领扣125)

01背包问题，从最大体积向0体积枚举；
完全背包问题，从0体积向最大体积枚举；

## 题目

* [LeetCode 300. Longest Increasing Subsequence (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/201-300/300.longest-increasing-subsequence.md)

* [LeetCode 322. Coin Change (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/301-400/322.coin-change.md)

* [LeetCode 474. Ones and Zeroes (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/401-500/474.ones-and-zeroes.md)


