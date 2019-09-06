package playgrounds

import (
	"fmt"
	"reflect"
	"testing"
)

func TestGetRow(t *testing.T) {
	arr := GetRow(3)
	fmt.Println(arr)
	if !reflect.DeepEqual(arr, []int{1, 3, 3, 1}) {
		t.Fail()
	}
}

func TestMinSubArrayLen(t *testing.T) {
	r := MinSubArrayLen(7, []int{2, 3, 1, 2, 4, 3})
	fmt.Println(r)
	if 2 != r {
		t.Fail()
	}
}
