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
