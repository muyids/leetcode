# [剑指 Offer 24.反转链表](https://leetcode.cn/problems/fan-zhuan-lian-biao-lcof/)

<p>定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。</p>

<p>&nbsp;</p>

<p><strong>示例:</strong></p>

<pre><strong>输入:</strong> 1-&gt;2-&gt;3-&gt;4-&gt;5-&gt;NULL
<strong>输出:</strong> 5-&gt;4-&gt;3-&gt;2-&gt;1-&gt;NULL</pre>

<p>&nbsp;</p>

<p><strong>限制：</strong></p>

<p><code>0 &lt;= 节点个数 &lt;= 5000</code></p>

<p>&nbsp;</p>

<p><strong>注意</strong>：本题与主站 206 题相同：<a href="https://leetcode-cn.com/problems/reverse-linked-list/">https://leetcode-cn.com/problems/reverse-linked-list/</a></p>

<details>
<summary>标签：</summary>
['递归', '链表']
</details>

<details>
<summary>难度：Easy</summary>
喜欢：478
</details>

---

# 非递归

## 算法思路

非递归反转操作，需要 三个节点 ，其中一个当前节点 cur, 两个辅助节点 pre 和 next

## 时间复杂度 $O(n)$

## 代码实现

```cpp []

```

```java []
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

## 参考文献

# 递归

## 算法思路

![](https://muyids.oss-cn-beijing.aliyuncs.com/2021-07-08%20am9.35.35.png)

## 时间复杂度 $O(n)$

## 代码实现

```cpp []

```

```java []
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

## 参考文献
