package playgrounds

// 119. 杨辉三角 II
func GetRow(rowIndex int) []int {
	floor := []int{1}
	if rowIndex == 0 {
		return floor
	}
	for row := 1; row <= rowIndex; row++ {
		now := make([]int, 0)
		for j := 0; j <= row; j++ {
			left := 0
			if j-1 >= 0 {
				left = floor[j-1]
			}
			right := 0
			if j < row {
				right = floor[j]
			}
			now = append(now, left+right)
		}
		floor = now
	}
	return floor
}

// 209. 长度最小的子数组
// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组。如果不存在符合条件的连续子数组，返回 0。
func MinSubArrayLen(s int, nums []int) int {
	for l := 1; l <= len(nums); l++ {
		for i := 0; i+l <= len(nums); i++ {
			sum := 0
			for k := 0; k < l; k++ {
				sum += nums[i+k]
			}
			if sum >= s {
				return l
			}
		}
	}
	return 0
}
