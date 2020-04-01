在经典汉诺塔问题中，有 3 根柱子及 N 个不同大小的穿孔圆盘，盘子可以滑入任意一根柱子。一开始，所有盘子自上而下按升序依次套在第一根柱子上(即每一个盘子只能放在更大的盘子上面)。移动圆盘时受到以下限制:

- (1) 每次只能移动一个盘子;
- (2) 盘子只能从柱子顶端滑出移到下一根柱子;
- (3) 盘子只能叠在比它大的盘子上。

请编写程序，用栈将所有盘子从第一根柱子移到最后一根柱子。

你需要原地修改栈。

```cpp
示例1:

 输入：A = [2, 1, 0], B = [], C = []
 输出：C = [2, 1, 0]
示例2:

 输入：A = [1, 0], B = [], C = []
 输出：C = [1, 0]
```

提示:

- A中盘子的数目不大于14个。

---

## 解题思路

- 如果n为1，直接把A的最上面移动到C。
- 否则把A的前n-1个，通过空的C，移动到B，即F(A,n-1,C,B)；
- 然后把A最下的的一个移动到C，这时候A是空的了，再通过空的A把B的n-1个全部移动到C，即F(B,n-1,A,C)即可。

## 代码实现

```cpp
class Solution {
public:
    void hanota(vector<int>& A, vector<int>& B, vector<int>& C) {
        dfs(A, A.size(), B, C);
    }

    // 把A的前n个通过B移动到C
    void dfs(vector<int>& A, int n, vector<int>& B, vector<int>& C){
        if (n == 1) {
            C.push_back(A.back());
            A.pop_back();
            return;
        }
        dfs(A, n-1, C, B);
        C.push_back(A.back());
        A.pop_back();
        dfs(B, n-1, A, C);
    }
};
```
