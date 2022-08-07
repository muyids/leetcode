package playground

import "testing"

func TestMaxSubArray(t *testing.T) {
	if 6 != MaxSubArray([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4}) {
		t.Fail()
	}
}
