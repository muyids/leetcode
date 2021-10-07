

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode a, ListNode b) {
        ListNode ca = a, cb = b;
        while (a != b){
            if (a==null || b== null) return null;
            a = a.next;
            b = b.next;
            if (a == null) {
                a = cb;
                cb = null;
            }
            if (b== null){
                b= ca;
                ca = null;
            }
        }
        return a;
    }
}
```