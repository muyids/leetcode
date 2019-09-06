package playgrounds

// 205. 同构字符串
func IsIsomorphic(s string, t string) bool {
	m := make(map[byte]byte, 0)
	m2 := make(map[byte]byte, 0)
	for i := 0; i < len(s); i++ {
		if _, ok := m2[t[i]]; ok {
			if m2[t[i]] != s[i] {
				return false
			}
		} else {
			m2[t[i]] = s[i]
		}
		if _, ok := m[s[i]]; ok {
			if m[s[i]] != t[i] {
				return false
			}
		} else {
			m[s[i]] = t[i]

		}
	}
	return true
}

// 是否回文串；动态规划思路
// 对于字符串 s。
// 用 dp[i][j] 表示 s[i，j] 是否是回文串。
// 然后有 dp[i][j] = s[i] == s[j] && dp[i+1][j-1]
func IsPalindrome(s string) [][]bool {
	dp := make([][]bool, len(s))
	for i := 0; i < len(s); i++ {
		dp[i] = make([]bool, len(s))
	}
	for k := 1; k <= len(s); k++ { // 长度k
		for i := 0; i <= len(s)-k; i++ {
			j := i + k - 1;
			dp[i][j] = s[i] == s[j] && (k < 3 || dp[i+1][j-1]);
		}
	}
	return dp
}

// 131. 分割回文串
func Partition(s string) [][]string {
	ans := make([][]string, 0)
	return ans
}
