## LCS

最长公共子序列

```cpp
class Solution {
public:
    int longestCommonSubsequence(string s, string t) {
        vector<vector<int>> dp(s.size()+1, vector<int>(t.size()+1, 0));
        int ans = 0;
        for (int i = 1; i< dp.size(); i++){
            for (int j = 1; j < dp[0].size(); j++){
                if (s[i-1] == t[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                    ans = max(ans, dp[i][j]);
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        return ans;
    }
};
```

最长公共子串

```cpp
class Solution {
public:
    int findLength(string s, string t) {
        vector<vector<int>> dp(s.size()+1, vector<int>(t.size()+1, 0));
        int ans = 0;
        for (int i = 1; i < dp.size(); i++){
            for (int j = 1; j < dp[0].size(); j++){
                if (s[i-1] == t[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                    ans = max(ans, dp[i][j]);
                }
            }
        }
        return ans;
    }
};
```

## LIS

最长上升子序列

动态规划解法

dp[i] 表示以i位置结尾的最长上升子序列

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        vector<int> f(n, 1);
        for (int i = 1; i< n; i++)
            for (int j = 0; j < i; j++)
                if (nums[i] > nums[j])
                    f[i] = max(f[i], f[j]+ 1);
        return *max_element(f.begin(), f.end());
    }
};
```

最长上升子序列问题：

1. 俄罗斯套娃
2. 堆箱子
3. 信封问题
