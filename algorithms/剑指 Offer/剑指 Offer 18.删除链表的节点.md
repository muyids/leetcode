# [剑指 Offer 18.删除链表的节点](https://leetcode.cn/problems/shan-chu-lian-biao-de-jie-dian-lcof/)

<p>给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。</p>

<p>返回删除后的链表的头节点。</p>

<p><strong>注意：</strong>此题对比原题有改动</p>

<p><strong>示例 1:</strong></p>

<pre><strong>输入:</strong> head = [4,5,1,9], val = 5
<strong>输出:</strong> [4,1,9]
<strong>解释: </strong>给定你链表中值为&nbsp;5&nbsp;的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -&gt; 1 -&gt; 9.
</pre>

<p><strong>示例 2:</strong></p>

<pre><strong>输入:</strong> head = [4,5,1,9], val = 1
<strong>输出:</strong> [4,5,9]
<strong>解释: </strong>给定你链表中值为&nbsp;1&nbsp;的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -&gt; 5 -&gt; 9.
</pre>

<p>&nbsp;</p>

<p><strong>说明：</strong></p>

<ul>
	<li>题目保证链表中节点的值互不相同</li>
	<li>若使用 C 或 C++ 语言，你不需要 <code>free</code> 或 <code>delete</code> 被删除的节点</li>
</ul>

<details>
<summary>标签：</summary>
['链表']
</details>

<details>
<summary>难度：Easy</summary>
喜欢：252
</details>

---

# 算法 1

## 算法思路

删除节点

- 辅助节点 dummpy 用于返回 head
- 辅助节点 pre + 当前节点 cur 用于删除节点

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

## 参考文献
