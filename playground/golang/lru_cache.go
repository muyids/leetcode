package playgrounds

import "fmt"

/**
底层数据结构是有序字典
本质上是实现Map.keys().iterator有序
类似于java的linkedHashMap
python的OrderedDict
javascript ES6中的Map
https://leetcode-cn.com/problems/lru-cache/
*/
type LRU struct {
	capacity int
	store    map[int]int  // collection存储k-v
	queue    *DLinkedList // queue存储访问顺序（array,linklist均可）
}

func LRUConstruct(cap int) *LRU {
	fmt.Println("init lru cache instance success")
	return &LRU{cap, make(map[int]int), &DLinkedList{Tail: nil, Head: nil, Len: 0}}
}

func (this *LRU) Get(key int) int {

	/**
	查询store中是否存在元素
	若存在，将元素移动到链表头，返回元素
	若不存在，返回-1
	*/
	if _, ok := this.store[key]; !ok {
		return -1
	}
	this.queue.DeleteVal(key)
	this.queue.AddAtHead(key)

	return this.store[key]
}

func (this *LRU) Put(key int, val int) {
	/**
	查询store中是否存在，
	若存在，将元素移动到链表头
	若不存在，队列链表尾部弹出一个元素，同时将队尾元素从store中删除；将新put元素添加到链表头
	写入store
	*/
	if _, ok := this.store[key]; ok {
		this.queue.DeleteVal(key)
	}
	this.queue.AddAtHead(key)
	for this.queue.Len > this.capacity {
		q := this.queue.Pop()
		delete(this.store, q.Val)
	}
	this.store[key] = val
}

//cache := playgrounds.LRUConstruct(2);
//cache.Put(1, 111111);
//cache.Put(2, 22222);
//cache.Get(1);          // 返回  1
//cache.Put(3, 3333333); // 该操作会使得密钥 2 作废
//cache.Get(2);          // 返回 -1 (未找到)
//
//cache.Put(4, 4);    // 该操作会使得密钥 1 作废
//cache.Get(1);       // 返回 -1 (未找到)
//cache.Get(3);       // 返回  3
//a2 := cache.Get(4); // 返回  4
