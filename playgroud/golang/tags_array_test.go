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
