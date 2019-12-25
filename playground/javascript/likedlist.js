/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

function InitList(arr) {
    if (0 == arr.length) {
        return null
    }
    let head = new ListNode(arr[0])
    let curr = head
    for (let i = 1; i < arr.length; i++) {
        curr.next = new ListNode(arr[i])
        curr = curr.next
    }
    return head
}

function Traverse(head) {
    if (!head) return console.log("list null")
    let ans = []
    while (head) {
        ans.push(head.val)
        head = head.next
    }
    console.log("Traverse Result:", ans)
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    let arr = []
    for (let p of lists) {
        while (p != null) {
            arr.push(p.val)
            p = p.next
        }
    }
    arr.sort((a, b) => a - b)
    if (arr.length == 0) return null
    let head = new ListNode(arr[0])
    let p = head
    for (let i = 1; i < arr.length; i++) {
        p.next = new ListNode(arr[i])
        p = p.next
    }
    return head
};

// 725. 分隔链表
var splitListToParts = function (root, k) {
    let p = root
    let ans = new Array(k).fill(null)
    if (p == null) return ans

    let l = 0; // 计算链表长度
    while (p) {
        l++
        p = p.next
    }
    // 计算每一部分长度
    let avg = parseInt(l / k)
    let last = l % k
    let counter = new Array(k).fill(avg)
    for (let i = 0; i < last; i++) counter[i]++

    // 分割链表
    let n = 1
    let head = root
    for (let i = 0; i < counter.length; i++) {
        let cur = head
        if (counter[i] == 0 || cur == null) break
        while (n < counter[i]) {
            n++
            cur = cur.next
        }
        ans[i] = head
        head = cur.next
        cur.next = null
        n = 1
    }
    return ans
};

// 147. 插入排序
var insertionSortList = function (head) {
    if (!head) return null;
    let node = {
        val: null,
        next: head,
    }
    while (head && head.next !== null) {
        // 当当前节点大于后面的节点的时候，需要进行处理
        if (head.val > head.next.val) {
            // 取出下一个节点
            let cur = head.next;
            head.next = cur.next;
            cur.next = null;
            // 取出节点放在从头开始比较节点的大小
            let nodeNext = node;
            let isAdd = false;
            while (nodeNext && nodeNext.next !== null) {
                // 当找到一个节点的下一个节点大于当前取出的节点的时候，插入
                if (nodeNext.next.val > cur.val) {
                    cur.next = nodeNext.next;
                    nodeNext.next = cur;
                    isAdd = true;
                    break;
                }
                nodeNext = nodeNext.next;
            }
            // 如果没有进循环，表示没有比自己更大的节点，因此直接插入在最后面
            if (!isAdd) {
                nodeNext.next = cur;
            }
        }
        // 这里需要判断是否交换到最后一个节点，若是最后一个是没有下一个的值的
        if (head.next && head.next.val >= head.val) {
            head = head.next;
        }
    }
    return node.next;
};

// 92. 反转链表 II
var reverseBetween = function (head, m, n) {
    return head
};

let root = InitList([1, 2, 3, 4, 5])
head = reverseBetween(root, 2, 4)
Traverse(head)

