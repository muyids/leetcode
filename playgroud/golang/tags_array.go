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
