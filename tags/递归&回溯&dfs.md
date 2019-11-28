---

## dfs 递归 回溯 剪枝

---

* 代码模板

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

---

深度优先搜索经常用来处理数据量非常庞大的问题

用于解决树形问题

- 比如数独问题，用宽搜搜不玩的

宽度优先搜索经常用来处理最短路径，或最短距离

深度搜索不一定等于递归，也可以用循环来实现

所谓回溯就是恢复初始状态（恢复现场）

如果我们的状态是整个棋盘，就需要恢复现场，如果是某一个格子，就不需要恢复现场

### 17. 电话号码的字母组合

给定一个仅包含数字 2-9 的字符串（与电话按键相同），返回所有它能表示的字母组合。	

### 79. 单词搜索

在一个二维数组里搜索是否存在单词

注意搜索的顺序！

1. 枚举起点，四个方向，上下左右
2. 从起点开始，依次搜索下一个点的位置
3. 枚举过程中保证和目标单词匹配

算法复杂度 长n,宽m,长度k,负责度为n*m*3^k

```go
func exist(board [][]byte, word string) bool {
	if len(board) == 0 || len(board[0]) == 0 {
		return false
	}
	for m := 0; m < len(board); m++ {
		for n := 0; n < len(board[0]); n++ {
			if (dfs(board, m, n, word, 0)) {
				return true
			}
		}
	}
	return false
}

var dirM = []int{-1, 0, 1, 0}
var dirN = []int{0, 1, 0, -1}

func dfs(board [][]byte, m int, n int, word string, i int) bool {
	// 如果当前位置不匹配, return false
	if board[m][n] != word[i] {
		return false
	}
	// 如果到达单词末尾, return true
	if i == len(word)-1 {
		return true
	}
	// 当前位置置为 "."
	board[m][n] = '.'
	// 继续往下走，判断
	for k := 0; k < 4; k++ {
		X := m + dirM[k]
		Y := n + dirN[k]
		if X >= 0 && X < len(board) && Y >= 0 && Y < len(board[0]) {
			if (dfs(board, X, Y, word, i+1)) {
				return true
			}
		}
	}
	// 恢复现场
	board[m][n] = word[i]
	return false
}
```

**排列组合的枚举46，47，78，90**

### 46. 全排列

给定一个没有重复数字的序列，返回其所有可能的全排列。

思路一，枚举每一个位置上该放哪些数

```go
class Solution {
    vector<bool> bt;
    vector<vector<int>> ans;
    vector<int> path;
    int n;
public:
    vector<vector<int>> permute(vector<int> &nums) {
        n = nums.size();
        for (int i = 0; i < n; i++) {
            bt.push_back(false);
        }
        dfs(nums, 0);
        return ans;
    }

    void dfs(vector<int> &nums, int u) {
        if (u == n) {
            ans.push_back(path);
            return;
        }

        for (int i = 0; i < n; i++) {
            if (!bt[i]) {
                bt[i] = true;
                path.push_back(nums[i]);
                dfs(nums, u + 1);
                path.pop_back();
                bt[i] = false;
            }
        }
    }
};
```

思路二，枚举每个数放在哪个位置上

### 47. 全排列 2

这个题比较难，好好思考下

### 78. 子集

#### bfs + 回溯

```go
class Solution {

    vector<vector<int>> ans;
    vector<int> path;
public:
    vector<vector<int>> subsets(vector<int> &nums) {
        dfs(nums, 0);
        return ans;
    }

    void dfs(vector<int> &nums, int f) {
        if (f == nums.size()) {
            ans.push_back(path);
            return;
        }

        path.push_back(nums[f]);
        dfs(nums, f + 1);
        path.pop_back();
        dfs(nums, f + 1);
    }
};

```

#### 二进制法

### 90. 子集II

### 216. 组合数III

找出所有相加之和为 n 的 k 个数的组合。
组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。

输入: k = 3, n = 9
输出: [[1,2,6], [1,3,5], [2,3,4]]

```go
class Solution {
    int N, K;
    vector<vector<int>> ans;
public:
    vector<vector<int>> combinationSum3(int k, int n) {
        N = n;
        K = k;
        vector<int> path;
        dfs(path, 0, 0);
        return ans;
    }

    void dfs(vector<int> path, int u, int sum) {
        if (sum == N) {
            if (path.size() == K) {
                ans.push_back(path);
            }
            return;
        }
        if (sum > N || u == 9 || path.size() == K) {
            return;
        }
        path.push_back(u + 1);
        dfs(path, u + 1, sum + u + 1);
        path.pop_back();
        dfs(path, u + 1, sum);
    }
};
```

### 52. 八皇后问题 II

依次枚举每一行皇后的位置

- 每一列只有一个皇后 col[N]
- 每一条斜线只有一个皇后 d[2*N -1], ud[2*N -1]
	两种斜线
	斜率为1，d[x + y]
	斜率为-1 , ud[x-y+n]

```go
class Solution {

    vector<vector<char >> V;
    int ans = 0;
    int N;

    vector<bool> col, d, ud;

public:
    int totalNQueens(int n) {
        N = n;
        col = vector<bool>(n);
        d = vector<bool>(2 * n);
        ud = vector<bool>(2 * n);

        dfs(V, 0);
        return ans;
    }

    void dfs(vector<vector<char >> V, int i) {
        if (i == N) {
            ans++;
            return;
        }
        for (int j = 0; j < N; j++) {
            if (!col[j] && !d[i + j] && !ud[i - j + N]) {
                col[j] = d[i + j] = ud[i - j + N] = true;
                dfs(V, i + 1);
                col[j] = d[i + j] = ud[i - j + N] = false;
            }
        }
    }
};
```

### 37. 解数独

精确覆盖问题, 用到一种数据结构 Dancing Links

```cpp
class Solution {
    bool row[9][9] = {0}, col[9][9] = {0}, sub[3][3][9] = {0};
public:
    void solveSudoku(vector<vector<char>> &board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != '.') {
                    int c = board[i][j] - '1';
                    row[i][c] = col[j][c] = sub[i / 3][j / 3][c] = true;
                }
            }
        }
        dfs(board, 0, 0);
    }

    bool dfs(vector<vector<char>> &board, int x, int y) {
        if (y == 9) {
            x += 1;
            y = 0;
        }
        if (x == 9) return true;
        if (board[x][y] != '.') return dfs(board, x, y + 1);
        for (int k = 0; k < 9; k++) {
            if (!row[x][k] && !col[y][k] && !sub[x / 3][y / 3][k]) {
                row[x][k] = col[y][k] = sub[x / 3][y / 3][k] = true;
                board[x][y] = '1' + k;
                if (dfs(board, x, y + 1)) {
                    return true;
                }
                board[x][y] = '.';
                row[x][k] = col[y][k] = sub[x / 3][y / 3][k] = false;
            }
        }

        return false;
    }
};
```

### 473. 火柴拼正方形

把所有木棒拼成正方形

**剪枝的经典题目**

---

依次构造正方形的每条边

剪枝：
1. 从大到小枚举所有边，提高剪枝效率
2. 每条边内部的木棒长度规定成从大到小
3. 如果当前木棒拼接失败，则跳过接下来所有长度相同的木棒
4. 如果当前木棒拼接失败，且是当前边的第一个，则直接减掉当前分支
5. 如果当前木棒拼接失败，且是当前边的最后一个，则直接减掉当前分支

```cpp
class Solution {
    vector<bool> st;
public:
    bool makesquare(vector<int> &nums) {
        int sum = 0;
        for (auto u : nums) sum += u;
        if (!sum || sum % 4 != 0) return false;

        sort(nums.begin(), nums.end());
        reverse(nums.begin(), nums.end());

        st = vector<bool>(nums.size());
        return dfs(nums, 0, 0, sum / 4); // 第几条边，当前边的长度，当前边的总长度
    }

    bool dfs(vector<int> nums, int u, int cur, int length) {
        if (cur == length) u++, cur = 0;
        if (u == 4) return true;

        for (int i = 0; i < nums.size(); i++) {
            if (!st[i] && cur + nums[i] <= length) {
                st[i] = true;
                if (dfs(nums, u, cur + nums[i], length))return true;
                st[i] = false;
                if (!cur) return false;
                if (cur + nums[i] == length) return false;
                while (i + 1 < nums.size() && nums[i + 1] == nums[i]) i++;
            }
        }
        return false;
    }
};
```


----

##### 131. 分割回文串

给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。

返回 s 所有可能的分割方案。


##### 306. 累加数

累加数是一个字符串，组成它的数字可以形成累加序列。

一个有效的累加序列必须至少包含 3 个数。除了最开始的两个数以外，字符串中的其他数都等于它之前两个数相加的和。

给定一个只包含数字 '0'-'9' 的字符串，编写一个算法来判断给定输入是否是累加数。

说明: 累加序列里的数不会以 0 开头，所以不会出现 1, 2, 03 或者 1, 02, 3 的情况。

输入: "199100199"
输出: true 
解释: 累加序列为: 1, 99, 100, 199。1 + 99 = 100, 99 + 100 = 199

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/additive-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





