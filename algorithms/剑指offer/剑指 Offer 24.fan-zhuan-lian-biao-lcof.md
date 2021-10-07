## 非递归

非递归反转操作，需要 三个节点 ，其中一个当前节点cur, 两个辅助节点 pre 和 next

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode pre = null, cur = head;
        while(cur != null){
            ListNode next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        return pre;
    }
}
```


## 递归

![](https://muyids.oss-cn-beijing.aliyuncs.com/2021-07-08%20am9.35.35.png)


```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode node) {
        if (node == null || node.next == null) return node;
        ListNode next = reverseList(node.next);
        node.next.next = node;
        node.next = null;
        return next;
    }
}
```