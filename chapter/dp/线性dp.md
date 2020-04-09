# 线性dp

线性dp的模型是线性的

## 问题分类

线性dp可以按分析方式分为几类：

- 坐标型（一维坐标，二维坐标）
- 划分型（将序列分成若干段，每一段具有最大/最小的性质）

## 坐标型

- 坐标记录状态
- 可以用滚动数组进行空间优化

### 一维坐标

硬币组合: 足够的2，5，7面值的硬币，问最少用多少个硬币能组合出面值27（有多少种方式凑出面值27）

f(i) 表示凑出i元所有的最少硬币数（凑出i元的方案数）

- [LeetCode 518. Coin Change 2 (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/501-600/518.coin-change-2.md)

- [面试题46. 把数字翻译成字符串](https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)

### 二维坐标

不同路径：在一个二维棋盘中，机器人从左上角走到右下角，有多少种走法

- [LeetCode 64. Minimum Path Sum (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/64.minimum-path-sum.md)

### 炸弹袭击

二维矩阵中的格子为空，敌人，墙，炸弹可以放在任意空地上，炸弹会杀死同一行和同一列没有墙阻隔的敌人；问一个炸弹杀死的最大敌人数

- [领扣553. 炸弹袭击](https://www.lintcode.com/problem/bomb-enemy/)

算法思路：

- 记录dp[i][j][0,1,2,3]分别为向四个方向能炸死的敌人数目
- 从四个方向，做差分，记录每个位置在此方向上能够炸死的敌人数目
- 四个方向求和，迭代得最大值

### 最长序列


- [LeetCode 300. Longest Increasing Subsequence (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/201-300/300.longest-increasing-subsequence.md)

- [LeetCode 1143. Longest Common Subsequence (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1101-1200/1143.longest-common-subsequence.md)

### 图形问题

根据棋盘中图形的性质，通过相邻坐标的状态，进行推导

#### 矩形统计

- [LeetCode 221. Maximal Square (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/201-300/221.maximal-square.md)

- [LeetCode 1277. Count Square Submatrices with All Ones (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1201-1300/1277.count-square-submatrices-with-all-ones.md)

## 序列型

序列型一般分为单序列、双序列

- 一般需要自定义空序列表示f[0]
- 有时候会有K维序列，表示K种状态

## 房子涂色

- [LeetCode 256. Paint House (easy)](https://github.com/muyids/leetcode/blob/master/algorithms/201-300/256.paint-house.md)

- [LeetCode 265. Paint House II (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/201-300/265.paint-house-ii.md)

## 打家劫舍系列

- [LeetCode 198. House Robber (easy)](https://github.com/muyids/leetcode/blob/master/algorithms/101-200/198.house-robber.md)

- [LeetCode 213. House Robber II (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/201-300/213.house-robber-ii.md)

打家劫舍3 是树形DP

## 股票系列

- [LeetCode 121. Best Time to Buy and Sell Stock (easy)](https://github.com/muyids/leetcode/blob/master/algorithms/101-200/121.best-time-to-buy-and-sell-stock.md)
 
- [LeetCode 122. Best Time to Buy and Sell Stock II (easy)](https://github.com/muyids/leetcode/blob/master/algorithms/101-200/122.best-time-to-buy-and-sell-stock-ii.md)

- [LeetCode 123. Best Time to Buy and Sell Stock III (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/101-200/123.best-time-to-buy-and-sell-stock-iii.md)

- [LeetCode 188. Best Time to Buy and Sell Stock IV (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/101-200/188.best-time-to-buy-and-sell-stock-iv.md)

- [LeetCode 309. Best Time to Buy and Sell Stock with Cooldown (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/301-400/309.best-time-to-buy-and-sell-stock-with-cooldown.md)

- [LeetCode 714. Best Time to Buy and Sell Stock with Transaction Fee (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/701-800/714.best-time-to-buy-and-sell-stock-with-transaction-fee.md)

## 字符串匹配系列

- [LeetCode 10. Regular Expression Matching (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/10.regular-expression-matching.md)

- [LeetCode 44. Wildcard Matching (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/44.wildcard-matching.md)

- [LeetCode 72. Edit Distance (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/72.edit-distance.md)

## 划分型

给定长度为N的序列，要求划分为若干段

- 段数不限，或指定K段
- 每一段满足一定的性质（最小代价，能不能等）

做法：

- 类似于序列型动态规划，但是通常要加上段数信息
- 一般用`f[i + 1][k]`来记录前i个元素（元素0~i-1,f[0][k]表示空序列）分成k段的性质，如最小代价
- 关注最后一段，枚举最后一段可能情况 + 前面序列, 求最优策略

注意：划分型动态规划每一段序列一定是连续的

### 数字规律一类题目（一维坐标）

把一个完整的数字分成几个，满足一定的性质

- [LeetCode 279. Perfect Squares (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/201-300/279.perfect-squares.md)

- [LeetCode 343. Integer Break (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/301-400/343.integer-break.md)

此类问题往往也可以用完全背包模型去解决

### 解码方法

- [LeetCode 91. Decode Ways (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/91.decode-ways.md)

### 分割回文串

- [LeetCode 132. Palindrome Partitioning II (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/101-200/132.palindrome-partitioning-ii.md)

- [LeetCode 1278. Palindrome Partitioning III (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/1201-1300/1278.palindrome-partitioning-iii.md)

### 抄写书籍（领扣437）

N本书，每本有A[i]页；K个抄写员，每个抄写员可以抄连续的几本书；抄写员抄写速度一样；问最少需要多长时间抄写完毕。

可以用贪心，动态规划更通用，如果稍微变形，贪心就不可以用了

- [LeetCode 410. Split Array Largest Sum (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/401-500/410.split-array-largest-sum.md)

### 鸡蛋掉落

- [LeetCode 887. Super Egg Drop (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/801-900/887.super-egg-drop.md)


## 经典问题

- [LeetCode 300. Longest Increasing Subsequence (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/201-300/300.longest-increasing-subsequence.md)

- [LeetCode 1143. Longest Common Subsequence (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1101-1200/1143.longest-common-subsequence.md)

- [LeetCode 120. Triangle (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/101-200/120.triangle.md)

- [LeetCode 53. Maximum Subarray (easy)](https://github.com/muyids/leetcode/blob/master/algorithms/1-100/53.maximum-subarray.md)

- [LeetCode 152. Maximum Product Subarray (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/101-200/152.maximum-product-subarray.md)

- [LeetCode 887. Super Egg Drop (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/801-900/887.super-egg-drop.md)

- [LeetCode 354. Russian Doll Envelopes (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/301-400/354.russian-doll-envelopes.md)
