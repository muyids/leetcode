# [剑指 Offer II 053.二叉搜索树中的中序后继](https://leetcode.cn/problems/P5rCT8/)

<p>给定一棵二叉搜索树和其中的一个节点 <code>p</code> ，找到该节点在树中的中序后继。如果节点没有中序后继，请返回 <code>null</code> 。</p>

<p>节点&nbsp;<code>p</code>&nbsp;的后继是值比&nbsp;<code>p.val</code>&nbsp;大的节点中键值最小的节点，即按中序遍历的顺序节点 <code>p</code> 的下一个节点。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/01/23/285_example_1.PNG" style="height: 117px; width: 122px;" /></p>

<pre>
<strong>输入：</strong>root = [2,1,3], p = 1
<strong>输出：</strong>2
<strong>解释：</strong>这里 1 的中序后继是 2。请注意 p 和返回值都应是 TreeNode 类型。
</pre>

<p><strong>示例&nbsp;2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/01/23/285_example_2.PNG" style="height: 229px; width: 246px;" /></p>

<pre>
<strong>输入：</strong>root = [5,3,6,2,4,null,null,1], p = 6
<strong>输出：</strong>null
<strong>解释：</strong>因为给出的节点没有中序后继，所以答案就返回 <code>null 了。</code>
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li>树中节点的数目在范围 <code>[1, 10<sup>4</sup>]</code> 内。</li>
	<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
	<li>树中各节点的值均保证唯一。</li>
</ul>

<p>&nbsp;</p>

<p><meta charset="UTF-8" />注意：本题与主站 285&nbsp;题相同：&nbsp;<a href="https://leetcode-cn.com/problems/inorder-successor-in-bst/">https://leetcode-cn.com/problems/inorder-successor-in-bst/</a></p>

<details>
<summary>标签：</summary>
['树', '深度优先搜索', '二叉搜索树', '二叉树']
</details>

<details>
<summary>难度：Medium</summary>
喜欢：61
</details>

---

# 算法 1

## 算法思路

搜索树 节点 $p$ 的中序后继 为其右子树的最左孩子，迭代找到第一个右孩子，然后迭代找到最左孩子即可

## 复杂度分析

时间复杂度：$O(logn)$

空间复杂度：$O(1)$

## 代码实现

```cpp []
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        TreeNode res = null;
        while (root != null) {
            if (root.val > p.val) {
                res = root;
                root = root.left;
            } else {
                root = root.right;
            }
        }
        return res;
    }
}
```

```java []

```

## 参考文献
