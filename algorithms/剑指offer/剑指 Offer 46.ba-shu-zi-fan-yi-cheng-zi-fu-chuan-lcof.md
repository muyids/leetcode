



# [剑指 Offer 46. 把数字翻译成字符串](https://leetcode.cn/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)



# 解题思路

此题跟 [91. 解码方法](https://leetcode.cn/problems/decode-ways/) 是同一类题，解答这类题目主要是细心，列出DP table，枚举所有转化状态求解即可。

[DPTable枚举所有状态](https://leetcode.cn/problems/decode-ways/solution/by-muyids-xudn/)





$f[i]$ 表示以i结尾的子串 的所有方案数



00 - 99 所有状态转换

| i-1的字符 | i的字符  | 状态转移                                                     |
| --------- | -------- | ------------------------------------------------------------ |
| 0         | 0-9      | $f[i] = f[i-1]$                                              |
| 1         | 0-9      | $f[i] = f[i-1] + f[i-2]$                                     |
| 2         | 0-5，6-9 | 当0-5时，$f[i] = f[i-1] + f[i-2]$<br>当6-9时，$f[i] = f[i-1]$ |
| 3-9       | 0-9      | $f[i] = f[i-1]$                                              |



边界：



- $f[0] = 1$ ，防止越界
- $f[1] = 1$，边界



# 代码实现



```java
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



