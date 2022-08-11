# [剑指 Offer II 003.前 n 个数字二进制中 1 的个数](https://leetcode.cn/problems/w3tCBm/)

<p>给定一个非负整数 <code>n</code><b>&nbsp;</b>，请计算 <code>0</code> 到 <code>n</code> 之间的每个数字的二进制表示中 1 的个数，并输出一个数组。</p>

<p>&nbsp;</p>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>n =<strong> </strong>2
<strong>输出: </strong>[0,1,1]
<strong>解释:
</strong>0 --&gt; 0
1 --&gt; 1
2 --&gt; 10
</pre>

<p><strong>示例&nbsp;2:</strong></p>

<pre>
<strong>输入: </strong>n =<strong> </strong>5
<strong>输出: </strong><code>[0,1,1,2,1,2]
</code><span style="white-space: pre-wrap;"><strong>解释:</strong>
</span>0 --&gt; 0
1 --&gt; 1
2 --&gt; 10
3 --&gt; 11
4 --&gt; 100
5 --&gt; 101
</pre>

<p>&nbsp;</p>

<p><strong>说明 :</strong></p>

<ul>
	<li><code>0 &lt;= n &lt;= 10<sup>5</sup></code></li>
</ul>

<p>&nbsp;</p>

<p><strong>进阶:</strong></p>

<ul>
	<li>给出时间复杂度为&nbsp;<code>O(n*sizeof(integer))</code><strong>&nbsp;</strong>的解答非常容易。但你可以在线性时间&nbsp;<code>O(n)</code><strong>&nbsp;</strong>内用一趟扫描做到吗？</li>
	<li>要求算法的空间复杂度为&nbsp;<code>O(n)</code>&nbsp;。</li>
	<li>你能进一步完善解法吗？要求在C++或任何其他语言中不使用任何内置函数（如 C++ 中的&nbsp;<code>__builtin_popcount</code><strong>&nbsp;</strong>）来执行此操作。</li>
</ul>

<p>&nbsp;</p>

<p><meta charset="UTF-8" />注意：本题与主站 338&nbsp;题相同：<a href="https://leetcode-cn.com/problems/counting-bits/">https://leetcode-cn.com/problems/counting-bits/</a></p>

<details>
<summary>标签：</summary>
['位运算', '动态规划']
</details>

<details>
<summary>难度：Easy</summary>
喜欢：98
</details>

---

[338.比 特 位 计 数 ](https://github.com/muyids/leetcode/blob/master/algorithms/301-400/338.%E6%AF%94%E7%89%B9%E4%BD%8D%E8%AE%A1%E6%95%B0.md)
