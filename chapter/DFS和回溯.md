## dfs & 递归 & 回溯 & 剪枝

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

1. 把上面的n-1，从A->B;
2. 把最下面的盘子，从A->C;
3. 把B上的n-1，从B->A;

递归求解

```javascript
function Hanoi(n){
    if (n == 1) return 1
    if (n == 2) return 3
    return 2*Hanoi(n-1) + 1 // 可以通过递推公式得到
}
```

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

> 比如题目[62.不同路径](../algorithms/1-100/62.%20不同路径.md)可以使用递归求路径总数，也可以用动态规划，根据状态转换方程，递推求解

我的习惯是如果方便使用递推求解，可以直接递推，如果递归更容易理解，也可以递归

递归的问题是：容易出现爆栈，而且一旦逻辑出错，定位问题的难度也要高于递推

## 回溯经典问题：八皇后问题

八皇后问题是讲解**回溯**的经典案例

参考[力扣51.N皇后](../algorithms/1-100/51.%20N皇后.md)

## 练习题

### 排列、组合、子集相关

### LeetCode 79. Word Search （medium）

### LeetCode 46. Permutations（medium）

### LeetCode 47. Permutations II（medium）

### LeetCode 78. Subsets（medium）

两种思路：dfs + 回溯；二进制法

### LeetCode 90. Subsets II（medium）

### LeetCode 39. Combination Sum（medium）

### LeetCode 40. Combination Sum II（medium）

### LeetCode 216. Combination Sum III（medium）

---

### LeetCode 17. Letter Combinations of a Phone Number（medium）

### LeetCode 52. N-Queens II

### LeetCode 37. Sudoku Solver

拓展:数据结构 Dancing Links

### LeetCode 473. Matchsticks to Square

剪枝的经典题目,通过增加剪枝，极大优化宽搜效率

### LeetCode 22. Generate Parentheses（medium）

### LeetCode 131. Palindrome Partitioning（medium）

### LeetCode 306. Additive Number（medium）

### LeetCode 329. Longest Increasing Path in a Matrix (hard)

dp, dfs
