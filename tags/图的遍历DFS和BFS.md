# DFS和BFS

DFS和BFS对比

BFS

- 空间是指数级别的，大
- 不会有爆栈风险
- 可以求最短，最小

DFS

- 空间和深度成正比，小！
- 有爆栈的风险，比如深度最坏可能有1e5层，会爆栈（C++一般4M）；层信息都放在栈空间里
- 不能搜最短、最小

## 注意事项

- 判断当前节点、层是否已得到最终解
- 判断是否可以剪枝
- 防止循环遍历问题（比如存在环路，要退出）
- 遍历顺序如何选择（比如是弧头到弧尾还是弧尾到弧头）

## 题目列表

### flood fill算法

### LeetCode 733. Flood Fill (easy)

flood fill算法, dfs和bfs两种实现

### LeetCode 200. Number of Islands（medium）

- flood fill算法
- 并查集

---

### LeetCode 111. Minimum Depth of Binary Tree（easy）

### LeetCode 279. Perfect Squares (medium)

### LeetCode 130. Surrounded Regions （medium）

LeetCode 543. Diameter of Binary Tree

LeetCode 127. Word Ladder

LeetCode 542. 01 Matrix

### LeetCode 695. Max Area of Island

### LeetCode 886. Possible Bipartition（medium）

二分图判定

### 851. Loud and Rich (medium)

### 994. Rotting Oranges（easy)

### LeetCode 980. Unique Paths III (hard)

### LeetCode 1254. Number of Closed Islands（medium）

---

### 拓扑排序相关

拓扑排序，将AOV网转化成线性序列

应用场景：判断一个图中有没有环 & 图中每一个点是否在环里；

### LeetCode 207. Course Schedule

### LeetCode 210. Course Schedule II

### LeetCode 802. Find Eventual Safe States (medium)
