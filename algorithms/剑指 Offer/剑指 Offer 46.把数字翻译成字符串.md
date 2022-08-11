# [剑指 Offer 46.把数字翻译成字符串](https://leetcode.cn/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)

<p>给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 &ldquo;a&rdquo; ，1 翻译成 &ldquo;b&rdquo;，&hellip;&hellip;，11 翻译成 &ldquo;l&rdquo;，&hellip;&hellip;，25 翻译成 &ldquo;z&rdquo;。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。</p>

<p>&nbsp;</p>

<p><strong>示例 1:</strong></p>

<pre><strong>输入:</strong> 12258
<strong>输出:</strong> <code>5
</code><strong>解释:</strong> 12258有5种不同的翻译，分别是&quot;bccfi&quot;, &quot;bwfi&quot;, &quot;bczi&quot;, &quot;mcfi&quot;和&quot;mzi&quot;</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>0 &lt;= num &lt; 2<sup>31</sup></code></li>
</ul>

<details>
<summary>标签：</summary>
['字符串', '动态规划']
</details>

<details>
<summary>难度：Medium</summary>
喜欢：482
</details>

---

# 算法 1

## 算法思路

此题跟 [91. 解码方法](https://leetcode.cn/problems/decode-ways/) 是同一类题，解答这类题目主要是细心，列出 DP table，枚举所有转化状态求解即可。

[DPTable 枚举所有状态](https://leetcode.cn/problems/decode-ways/solution/by-muyids-xudn/)

$f[i]$ 表示以 i 结尾的子串 的所有方案数

00 - 99 所有状态转换

| i-1 的字符 | i 的字符 | 状态转移                                                          |
| ---------- | -------- | ----------------------------------------------------------------- |
| 0          | 0-9      | $f[i] = f[i-1]$                                                   |
| 1          | 0-9      | $f[i] = f[i-1] + f[i-2]$                                          |
| 2          | 0-5，6-9 | 当 0-5 时，$f[i] = f[i-1] + f[i-2]$<br>当 6-9 时，$f[i] = f[i-1]$ |
| 3-9        | 0-9      | $f[i] = f[i-1]$                                                   |

边界：

- $f[0] = 1$ ，防止越界
- $f[1] = 1$，边界

## 时间复杂度 $O(n^2)$

## 代码实现

```cpp []

```

```java []
class Solution {
    public int translateNum(int num) {
        char[] s = String.valueOf(num).toCharArray();
        int n = s.length;
        int[] f = new int[n+1];
        f[0] = f[1] = 1;
        for (int i = 2; i<= n; i++){
            char c = s[i-1], lastc = s[i-2];
            f[i] = f[i-1];
            if (lastc == '1' || (lastc =='2' &&  c >='0' && c<= '5'))
                f[i] += f[i-2];
        }
        return f[n];
    }
}
```

## 参考文献
