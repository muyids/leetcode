# DFS & 递归 & 回溯 & 剪枝

这四种算法结合使用，可以解决几类问题

- 排列组合问题
- 棋盘搜索的问题，往往是在一个棋盘上查找最短路径、路径方案数

## 递归代码模板

递归即为闭包

```go
func dfs(){
    doSomeThing()
    dfs()
    doAnotherThing()
}
```

回溯即附加条件后，递归下一状态之前，要回退上一步附加操作

```go
func dfs(){
    change()
    dfs()
    unchange()
}
```

dfs & 递归 & 回溯 & 剪枝 结合使用，代码模板

```cpp
for all router { // 遍历所有路径
    doCounter() // 统计结果
    doCut() // 剪枝
    func dfs(){ // 深搜
        doSomeThing()   // 搜索处理，保存当前状态等
        change()    // 当前棋盘变化
        dfs()       // 递归
        unchange()  // 回溯棋盘变化（恢复现场）
        doAnotherThing()
    }
}
```

## 适用于解决的问题特征

- 深度优先搜索经常用来处理数据量非常庞大的问题
    > 比如数独问题，用宽搜搜不完的
- 常用于解决树形问题
- `宽度优先搜索`经常用来处理最短路径，或最短距离
- 深度搜索不一定等于递归，也可以用循环来实现
- 所谓回溯就是恢复初始状态（恢复现场）
    > 如果我们的状态是整个棋盘，就需要恢复现场，如果是某一个格子，就不需要恢复现场

## 经典问题

引入几个简单问题，帮助大家理解概念

- 递归经典问题：汉诺塔
- 回溯经典问题：八皇后

### 递归经典问题：汉诺塔

三座塔A, B, C，求移动的最小次数

分三步：

1. 把上面的n-1，从`A->B`;
2. 把最下面的盘子，从`A->C`;
3. 把B上的n-1，从`B->A`;

递归求解

```javascript
function Hanoi(n){
    if (n == 1) return 1
    if (n == 2) return 3
    return 2*Hanoi(n-1) + 1 // 可以通过递推公式得到
}
```

- [面试题 08.06. 汉诺塔问题](https://github.com/muyids/leetcode/blob/master/lcci/hanota-lcci.md)

拓展：

四座塔A, B, C, D, 求移动的最小次数。

[转自acwing](https://www.acwing.com/problem/content/description/98/)

可以进行动态规划，递推求解

```cpp
#include <bits/stdc++.h>
using namespace std;
int d[21],f[21],i,j;
int main()
{
    for (i=1;i<=12;i++)
        d[i]=2*d[i-1]+1;
    memset(f,0x3f,sizeof(f));
    f[0]=0;
    for (i=1;i<=12;i++)
        for (j=0;j<i;j++)
            f[i]=min(f[i],2*f[j]+d[i-j]);
    for (i=1;i<=12;i++)
        cout<<f[i]<<endl;
}
```

所有递归问题都可以转化为递推求解

> 比如题目[LeetCode 62. Unique Paths (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/62.unique-paths.md)可以使用递归求路径总数，也可以用动态规划，根据状态转换方程，递推求解

我的习惯是如果方便使用递推求解，可以直接递推，如果递归更容易理解，也可以递归

递归的问题是：容易出现爆栈，而且一旦逻辑出错，定位问题的难度也要高于递推

## 回溯经典问题：八皇后问题

八皇后问题是讲解**回溯**的经典案例

参考

- [LeetCode 51. N-Queens (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/51.n-queens.md)

## 题目分类

### 排列、组合、子集问题

- 组合、排列、子集 问题 属于一类基础问题，有一些问题会抽象成求解组合、排列、子集
- 这类问题数据量不会太大
- 往往可以用DFS进行暴搜求解

#### 排列问题

题目特征: 请枚举所有排列

- [LeetCode 46. Permutations (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/46.permutations.md)

- [LeetCode 47. Permutations II (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/47.permutations-ii.md)

##### 拓展

- [LeetCode 996. Number of Squareful Arrays (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/901-1000/996.number-of-squareful-arrays.md)

#### 组合问题

求所有组合方案; 如果存在重复，则需要排序，过滤重复位置

##### 题目

题目特征: 请枚举所有组合

- [LeetCode 39. Combination Sum (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/39.combination-sum.md)

- [LeetCode 40. Combination Sum II (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/40.combination-sum-ii.md)

- [LeetCode 216. Combination Sum III (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/201-300/216.combination-sum-iii.md)

##### 拓展

- [LeetCode 93. Restore IP Addresses (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/93.restore-ip-addresses.md)

- [LeetCode 131. Palindrome Partitioning (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/101-200/131.palindrome-partitioning.md)

#### 子集问题

题目特征: 请枚举所有子集

- [LeetCode 78. Subsets (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/78.subsets.md)

- [LeetCode 90. Subsets II (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/90.subsets-ii.md)

### 棋盘搜索

棋盘搜索一般配合 DFS + memorization

- [LeetCode 351. Android Unlock Patterns (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/301-400/351.android-unlock-patterns.md)

- [LeetCode 329. Longest Increasing Path in a Matrix (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/301-400/329.longest-increasing-path-in-a-matrix.md)

- [LeetCode 52. N-Queens II (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/52.n-queens-ii.md)

- [LeetCode 37. Sudoku Solver (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/37.sudoku-solver.md)

- [LeetCode 473. Matchsticks to Square (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/401-500/473.matchsticks-to-square.md)

### 其他问题

- [LeetCode 22. Generate Parentheses (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/22.generate-parentheses.md)

- [LeetCode 131. Palindrome Partitioning (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/101-200/131.palindrome-partitioning.md)

- [LeetCode 306. Additive Number (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/301-400/306.additive-number.md)

- [LeetCode 17. Letter Combinations of a Phone Number (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/17.letter-combinations-of-a-phone-number.md)

