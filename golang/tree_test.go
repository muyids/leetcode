package golang

import "testing"

func TestSortedArrayToBST(t *testing.T) {
	s := []int{-10, -3, 0, 5, 9}
	root := sortedArrayToBSTBFS(s)
	InOrderDFS(root)
}

func TestSortedListToBST(t *testing.T) {
	s := []int{-10, -3, 0, 5, 9}
	head := ListConstructor(s)
	Traverse(head)
	root := sortedListToBSTDFS(head)
	InOrderDFS(root)
}
