package playgrounds

import (
	"container/list"
	"fmt"
	"math"
)

// Binary Tree
type TreeNode struct {
	Val   interface{}
	Left  *TreeNode
	Right *TreeNode
}

// Constructor
func InsertNode(data interface{}) *TreeNode {
	return &TreeNode{Val: data}
}

// 将数组初始化为二叉树（给定的数组是完全二叉树）
func InitTreeByArray(arr []interface{}) *TreeNode {
	if len(arr) == 0 {
		return nil
	}
	queue := make([]*TreeNode, 0)
	for i := 0; i < len(arr); i++ {
		queue = append(queue, &TreeNode{Val: arr[i]})
	}
	for i := 0; i <= len(arr)/2-1; i++ {
		if nil != queue[2*i+1].Val {
			queue[i].Left = queue[2*i+1]
		}
		if nil != queue[2*i+2].Val {
			queue[i].Right = queue[2*i+2]
		}
	}
	return queue[0]
}

// leetcode 108. 将有序数组转换为二叉搜索树
func SortedArrayToBST(nums []int) *TreeNode {
	return sortedArrayToBSTBFS(nums)
}

func sortedArrayToBSTBFS(nums []int) *TreeNode {
	if len(nums) == 0 {
		return nil
	}
	mid := len(nums) / 2
	root := &TreeNode{Val: nums[mid]}
	root.Left = sortedArrayToBSTBFS(nums[:mid])
	root.Right = sortedArrayToBSTBFS(nums[mid+1:])
	return root
}

// 109. 有序链表转换二叉搜索树
func SortedListToBST(head *ListNode) *TreeNode {
	return sortedListToBSTDFS(head)
}

func sortedListToBSTDFS(head *ListNode) *TreeNode {
	if nil == head {
		return nil
	}
	if nil == head.Next{
		return &TreeNode{Val: head.Val}
	}
	first := head
	mid, end := head, head
	var prev, second *ListNode = nil, nil

	for nil != end {
		end = end.Next
		if nil == end {
			break
		}
		end = end.Next
		prev = mid
		mid = mid.Next
	}
	if nil != prev {
		prev.Next = nil
	}
	if nil != mid {
		second = mid.Next
		mid.Next = nil
	}
	fmt.Println(mid, first, second)
	root := &TreeNode{Val: mid.Val}
	root.Left = sortedListToBSTDFS(first)
	root.Right = sortedListToBSTDFS(second)
	return root
}

/**
 * 110. 平衡二叉树
 * 给定一个二叉树，判断它是否是高度平衡的二叉树。
 * 		一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。
 */
func IsBalanced(root *TreeNode) bool {
	if nil == root {
		return true
	}
	return math.Abs(float64(maxDepth(root.Left))-float64(maxDepth(root.Right))) <= 1 && IsBalanced(root.Left) && IsBalanced(root.Right)
}

func maxDepth(root *TreeNode) int {
	if nil == root {
		return 0
	}
	return 1 + int(math.Max(float64(maxDepth(root.Left)), float64(maxDepth(root.Right))))
}

// 层遍历bfs
func (root *TreeNode) BFS() [][]interface{} {
	res := make([][]interface{}, 0)
	if (nil == root) {
		return res
	}
	queue := make([]*TreeNode, 0)
	queue = append(queue, root)
	for ; len(queue) > 0; {
		tmp := make([]interface{}, 0)
		for _, q := range queue {
			tmp = append(tmp, q.Val)
		}
		res = append(res, tmp)
		floor := make([]*TreeNode, 0)
		for _, node := range queue {
			if nil != node.Left {
				floor = append(floor, node.Left)
			}
			if nil != node.Right {
				floor = append(floor, node.Right)
			}
		}
		queue = floor
	}
	return res
}

// 先序遍历-递归
func PreOrderDFS(root *TreeNode) {
	if nil == root {
		return
	}
	fmt.Println(root.Val)
	PreOrderDFS(root.Left)
	PreOrderDFS(root.Right)
}

// 先序遍历-非递归
func (bt *TreeNode) PreOrderNoRecursion() []interface{} {
	t := bt
	stack := list.New()
	res := make([]interface{}, 0)
	for t != nil || stack.Len() != 0 {
		for t != nil {
			res = append(res, t.Val) //visit
			stack.PushBack(t)
			t = t.Left
		}
		if stack.Len() != 0 {
			v := stack.Back()
			t = v.Value.(*TreeNode)
			t = t.Right
			stack.Remove(v)
		}
	}
	return res
}

// 中序遍历-递归
func InOrderDFS(root *TreeNode) {
	if nil == root {
		return
	}
	PreOrderDFS(root.Left)
	fmt.Println(root.Val)
	PreOrderDFS(root.Right)
}

// 中序遍历-非递归
func (bt *TreeNode) InOrderNoRecursion() []interface{} {
	t := bt
	stack := list.New()
	res := make([]interface{}, 0)
	for t != nil || stack.Len() != 0 {
		for t != nil {
			stack.PushBack(t)
			t = t.Left
		}
		if stack.Len() != 0 {
			v := stack.Back()
			t = v.Value.(*TreeNode)
			res = append(res, t.Val) //visit
			t = t.Right
			stack.Remove(v)
		}
	}
	return res
}

// 后序遍历-递归
func PostOrderDFS(root *TreeNode) {
	if nil == root {
		return
	}
	PreOrderDFS(root.Left)
	PreOrderDFS(root.Right)
	fmt.Println(root.Val)
}

// 后序遍历-非递归
func (bt *TreeNode) PostOrderNoRecursion() []interface{} {
	t := bt
	stack := list.New()
	res := make([]interface{}, 0)
	var preVisited *TreeNode

	for t != nil || stack.Len() != 0 {
		for t != nil {
			stack.PushBack(t)
			t = t.Left
		}

		v := stack.Back()
		top := v.Value.(*TreeNode)

		if (top.Left == nil && top.Right == nil) || (top.Right == nil && preVisited == top.Left) || preVisited == top.Right {
			res = append(res, top.Val) //visit
			preVisited = top
			stack.Remove(v)
		} else {
			t = top.Right
		}
	}
	return res
}
