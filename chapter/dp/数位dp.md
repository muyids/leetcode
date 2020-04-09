# 数位dp

数位 DP 问题往往都是这样的题型，给定一个闭区间 `[l, r]`，让你求这个区间中满足 某种条件 的数的总数。

数位dp用来处理**计数问题**

## 例题：计算1到N中2出现的次数

算法思路：

求2在每一位上出现的次数，求和

分情况讨论

![计数问题解题思路](https://muyids.oss-cn-beijing.aliyuncs.com/dp-counter.png)

## 代码实现

```cpp
class Solution {
public:
    int numberOf2sInRange(int num) {
        int ans = 0;
        int n = 0;
        int tmp = num;
        while (tmp)n++, tmp/=10; // 获取num的位数
        for (int i = 0; i< n;i++){
            int k = num / (int)pow(10, n-i-1) %10;
            if (k > 2) {
               int f = num / (int)pow(10, n-i) + 1;
               int b = pow(10, n-i-1);
               ans += f * b;
            } else {
                int f = num / (int)pow(10, n-i);
                int b = (int)pow(10, n-i -1);
                ans += f * b;
            }
            if (k == 2) ans += num % (int)pow(10, n-i-1) + 1;
        }
        return ans;
    }
};
```

## 题目

- [LeetCode 233. Number of Digit One (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/201-300/233.number-of-digit-one.md)

- [LeetCode 902. Numbers At Most N Given Digit Set (hard)](https://github.com/muyids/leetcode/blob/master/algorithms/901-1000/902.numbers-at-most-n-given-digit-set.md)

- [LeetCode 1015. Smallest Integer Divisible by K (medium)](https://github.com/muyids/leetcode/blob/master/algorithms/1001-1100/1015.smallest-integer-divisible-by-k.md)

- [程序员面试金典；面试题 17.06. 2出现的次数](https://leetcode-cn.com/problems/number-of-2s-in-range-lcci/)

- [acwing 338. 计数问题](https://www.acwing.com/problem/content/340/)

- [hdu2089.不要62](http://acm.hdu.edu.cn/showproblem.php?pid=2089)
