package playgrounds

import (
	"fmt"
)

/**双向链表实现*/
type DLinkedList struct {
	Head *LinkNode
	Tail *LinkNode
	Len  int
}

type LinkNode struct {
	Val  int
	Next *LinkNode
	Prev *LinkNode
}

/** Initialize your data structure here. */
func Constructor() DLinkedList {
	return DLinkedList{nil, nil, 0}
}

/** Get the value of the index-th node in the linked list. If the index is invalid, return -1. */
func (this *DLinkedList) Get(index int) int {
	if index < 0 {
		return -1
	} else if index >= this.Len {
		return -1
	}
	p := this.Head
	if index == this.Len-1 {
		return this.Tail.Val
	}
	for {
		if index == 0 {
			return p.Val
		}
		p = p.Next
		index--
	}
}

/** Add a node of value val before the first element of the linked list.
After the insertion, the new node will be the first node of the linked list. */
func (this *DLinkedList) AddAtHead(val int) {
	node := &LinkNode{Val: val}
	if this.Len == 0 {
		this.Head = node
		this.Tail = node
	} else {
		this.Head.Prev = node
		node.Next = this.Head
		this.Head = node
	}
	this.Len += 1
}

/** Append a node of value val to the last element of the linked list. */
func (this *DLinkedList) AddAtTail(val int) {
	node := &LinkNode{Val: val}
	if this.Len == 0 {
		this.Head = node
		this.Tail = node
	} else {
		this.Tail.Next = node
		node.Prev = this.Tail
		this.Tail = node
	}
	this.Len += 1
}

/** Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. */
func (this *DLinkedList) AddAtIndex(index int, val int) {
	if index <= 0 {
		this.AddAtHead(val)
		return
	} else if index == this.Len {
		this.AddAtTail(val)
		return
	} else if index > this.Len {
		fmt.Println("out of index")
		return
	}
	node := &LinkNode{Val: val}
	p := this.Head
	for {
		if index == 0 {
			node.Next = p
			node.Prev = p.Prev
			p.Prev.Next = node
			p.Prev = node
			break
		}
		p = p.Next
		index--
	}
	this.Len += 1
}

func (this *DLinkedList) DeleteVal(val int) {
	index := this.FindIndex(val)
	this.DeleteAtIndex(index)
}

/** Delete the index-th node in the linked list, if the index is valid. */
func (this *DLinkedList) DeleteAtIndex(index int) {
	if index < 0 || index >= this.Len {
		return
	}
	if 0 == index { // 删除头
		this.Head = this.Head.Next
		if nil == this.Head {
			this.Tail = nil
		} else {
			this.Head.Prev = nil
		}
	} else if index == this.Len-1 { // 删除尾
		this.Tail = this.Tail.Prev
		this.Tail.Next = nil
	} else {
		p := this.Head.Next
		for {
			if 1 == index {
				p.Next.Prev = p.Prev
				p.Prev.Next = p.Next
				break
			}
			p = p.Next
			index--
		}
	}
	this.Len -= 1
}

/**返回元素出现的第一个位置下标*/
func (this *DLinkedList) FindIndex(val int) int {
	p := this.Head
	index := 0
	for {
		if p == nil {
			return -1
		}
		if p.Val == val {
			return index
		}
		index++
		p = p.Next
	}
}

func (this *DLinkedList) Pop() *LinkNode {
	p := this.Tail
	this.DeleteAtIndex(this.Len - 1)
	return p
}

func (this *DLinkedList) Travel() {
	p := this.Head
	for {
		fmt.Println(p)
		if nil == p {
			break
		}
		p = p.Next
	}
	fmt.Println("---------travel done----------")
}

//obj := playgrounds.Constructor();
//obj.AddAtHead(1);
//obj.AddAtTail(3);
//obj.AddAtIndex(1, 2);
//param_1 := obj.Get(1);
//obj.DeleteAtIndex(1);
//param_2 := obj.Get(1);
//obj.Travel()
//fmt.Println("main finish", param_1, param_2)
