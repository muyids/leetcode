package playground

import "testing"

func TestRemoveElements(t *testing.T) {
	head := ListConstructor([]int{1, 2, 2, 1})
	Traverse(head)
	head = RemoveElements(head, 2)
	Traverse(head)
}

func TestReverseList(t *testing.T) {
	head := ListConstructor([]int{1, 2, 3, 4, 5})
	Traverse(head)
	head = ReverseList(head)
	Traverse(head)
}
