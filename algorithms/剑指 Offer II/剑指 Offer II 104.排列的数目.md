# [剑指 Offer II 104.排列的数目](https://leetcode.cn/problems/D0F0SV/)

<p>给定一个由 <strong>不同</strong>&nbsp;正整数组成的数组 <code>nums</code> ，和一个目标整数 <code>target</code> 。请从 <code>nums</code> 中找出并返回总和为 <code>target</code> 的元素组合的个数。数组中的数字可以在一次排列中出现任意次，但是顺序不同的序列被视作不同的组合。</p>

<p>题目数据保证答案符合 32 位整数范围。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3], target = 4
<strong>输出：</strong>7
<strong>解释：</strong>
所有可能的组合为：
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
请注意，顺序不同的序列被视作不同的组合。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [9], target = 3
<strong>输出：</strong>0
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 200</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 1000</code></li>
	<li><code>nums</code> 中的所有元素 <strong>互不相同</strong></li>
	<li><code>1 &lt;= target &lt;= 1000</code></li>
</ul>

<p>&nbsp;</p>

<p><strong>进阶：</strong>如果给定的数组中含有负数会发生什么？问题会产生何种变化？如果允许负数出现，需要向题目中添加哪些限制条件？</p>

<p>&nbsp;</p>

<p><meta charset="UTF-8" />注意：本题与主站 377&nbsp;题相同：<a href="https://leetcode-cn.com/problems/combination-sum-iv/">https://leetcode-cn.com/problems/combination-sum-iv/</a></p>

<details>
<summary>标签：</summary>
['数组', '动态规划']
</details>

<details>
<summary>难度：Medium</summary>
喜欢：37
</details>

---

[377.组 合 总 和 Ⅳ](https://github.com/muyids/leetcode/blob/master/algorithms/301-400/377.%E7%BB%84%E5%90%88%E6%80%BB%E5%92%8C%20%E2%85%A3.md)
