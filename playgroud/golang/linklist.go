package playgrounds

import (
	"fmt"
)

// 单链表实现
type ListNode struct {
	Val  int
	Next *ListNode
}

// 初始化链表
func ListConstructor(s []int) *ListNode {
	if len(s) == 0 {
		return nil
	}
	head := &ListNode{Val: s[0]}
	p := head
	for i := 1; i < len(s); i++ {
		node := &ListNode{Val: s[i]}
		p.Next = node
		p = p.Next
	}
	return head
}

//生成头节点
func New(elem int) *ListNode {
	//下面的data可以用来表示链表的长度
	return &ListNode{elem, nil}
}

// 在链表尾部插入元素
func (head *ListNode) InsertFinal(elem int) bool {
	p := head
	for {
		if p.Next == nil {
			break
		}
		p = p.Next
	}
	p.Next = &ListNode{elem, nil}
	return true
}

// 在链表的第i个位置前插入一个元素e，复杂度为o(n)
func (head *ListNode) Insert(i int, e int) bool {
	p := head
	j := 1
	for nil != p && j < i {
		p = p.Next
		j++
	}
	if nil == p || j > i {
		fmt.Println("pls check i:", i)
		return false
	}
	s := &ListNode{Val: e}
	s.Next = p.Next
	p.Next = s
	return true
}

//遍历链表
func Traverse(head *ListNode) {
	if nil == head {
		fmt.Println("--------nil----------")
		return
	}
	point := head.Next
	fmt.Println(head.Val)
	for nil != point {
		fmt.Println(point.Val)
		point = point.Next
	}
	fmt.Println("--------Traverse Done----------")
}

//删除链表中第i个节点，复杂度为o(n)
func (head *ListNode) Delete(i int) bool {
	p := head
	j := 1
	for nil != p && j < i {
		p = p.Next
		j++
	}
	if nil == p || j > i {
		fmt.Println("pls check i:", i)
		return false
	}

	p.Next = p.Next.Next
	return true
}

// 获取链表中的第i个元素，复杂度为o(n)
func (head *ListNode) Get(i int) int {
	p := head.Next
	for j := 1; j < i; j++ {
		if nil == p {
			//表示返回错误
			return -100001
		}
		p = p.Next
	}

	return p.Val
}

//删除重复元素（出现过多次的元素全部删除）
func DeleteDuplicates(head *ListNode) *ListNode {
	set := make(map[int]int)
	if (nil == head) {
		return nil
	}
	set[head.Val] = 1
	p := head.Next
	for nil != p {
		if _, ok := set[p.Val]; ok {
			set[p.Val] += 1
		} else {
			set[p.Val] = 1
		}
		p = p.Next
	}

	p = head
	// to delete
	for nil != head && set[head.Val] > 1 {
		//fmt.Println("delete head", head.Val)
		head = head.Next
		p = head
		if (nil == head) {
			return nil
		}
	}

	for nil != p {
		q := p.Next
		if nil == q {
			return head
		}
		if set[q.Val] > 1 {
			//fmt.Println("delete node", q.Val)
			p.Next = q.Next
		} else {
			p = p.Next
		}
	}
	return head
}

// 删除重复元素
func DeleteDuplicatesLeftFirst(head *ListNode) *ListNode {
	if nil == head {
		return nil
	}
	p := head
	for nil != p {
		pre := p
		p = p.Next
		if nil == p {
			return head
		}
		if p.Val == pre.Val {
			pre.Next = p.Next
			p = pre
		}
	}
	return head
}

// 24. 两两交换链表中的节点
func SwapPairs(head *ListNode) *ListNode {
	if nil == head || nil == head.Next {
		return head
	}
	next := head.Next
	head.Next = SwapPairs(next.Next)
	next.Next = head
	return next
}

// 24. 两两交换链表中的节点
func SwapPairsStack(head *ListNode) *ListNode {
	if nil == head || nil == head.Next {
		return head
	}
	next := head.Next
	first := next
	head.Next = next.Next
	next.Next = head

	for {
		prev:= head
		head = head.Next
		if nil == head || nil == head.Next {
			break
		}
		next := head.Next
		prev.Next = next
		head.Next = next.Next
		next.Next = head
	}
	return first
}