package playgrounds

// 204. 计数质数
// 统计所有小于非负整数 n 的质数的数量
func CountPrimes(n int) int {
	if n < 2 {
		return 0
	}
	ans := 0
	for i := 2; i < n; i++ {
		if IsPrime(i) {
			ans++
		}
	}
	return ans
}
// 204. 计数质数-厄拉多塞筛法
func CountPrimesEratosthenes(n int) int {
	if n < 2 {
		return 0
	}
	ans := 0
	nums := make([]bool, n)
	for i := 2; i < n; i++ {
		if nums[i] {
			continue
		}
		if IsPrime(i) {
			nums[i] = true
			ans++
			for j := 2; j*i < n; j++ {
				nums[j*i] = true
			}
		}
	}
	return ans
}

func IsPrime(n int) bool {
	if n == 2 {
		return true
	}
	for i := 2; i*i <= n; i++ {
		if n%i == 0 {
			return false
		}
	}
	return true
}
