
删除节点

- 辅助节点 dummpy 用于返回 head
- 辅助节点 pre + 当前节点 cur 用于删除节点

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
    public ListNode deleteNode(ListNode head, int val) {
        ListNode dumppy = new ListNode();
        dumppy.next = head;
        ListNode pre = dumppy, cur = head;
        while (cur != null) {
            if (cur.val == val) {
                pre.next = pre.next.next;
                break;
            }
            pre = cur;
            cur = cur.next;
        }
        return dumppy.next;
    }
}
```