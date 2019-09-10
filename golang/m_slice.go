package golang

type MySlice []interface{}

// 初始化
func SliceConstructor() []interface{} {
	return make([]interface{}, 0)
}

// 去重
func RemoveDuplicate(s []interface{}) []interface{} {
	return make([]interface{}, 0)
}

// 插入
func Insert(s []interface{}, index int) []interface{} {
	return make([]interface{}, 0)
}

// 删除 指定位置元素

// 清空
func (queue *MySlice) Clear() bool {
	*queue = (*queue)[0:0]
	return true
}

// pop 末尾弹出一个元素
func Pop(queue *[]interface{}) interface{} {
	if nil == queue || 0 == len(*queue) {
		return nil
	}
	res := (*queue)[len(*queue)-1]
	*queue = (*queue)[:len(*queue)-1]
	return res
}

// push	末尾添加一个元素

// shift 开头删除一个元素

// unshift 开头增加一个元素
func Unshift(queue []interface{}, elem interface{}) []interface{} {
	front := append(make([]interface{}, 0), elem)
	return append(front, queue)
}

// 是否包含某个元素
func Contains() bool {
	return false
}

func MaxSubArray(nums []int) int {
	if len(nums) == 0 {
		return 0
	}
	dp := make([]int, len(nums))
	dp[0] = nums[0]
	max := dp[0]
	for i := 1; i < len(nums); i++ {
		dp[i] = nums[i]
		if dp[i-1]+nums[i] > nums[i] {
			dp[i] = dp[i-1] + nums[i]
		}
		if dp[i] > max {
			max = dp[i]
		}
	}

	return max
}
