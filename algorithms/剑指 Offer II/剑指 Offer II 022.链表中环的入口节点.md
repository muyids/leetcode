# [剑指 Offer II 022.链表中环的入口节点](https://leetcode.cn/problems/c32eOV/)

<p>给定一个链表，返回链表开始入环的第一个节点。 从链表的头节点开始沿着 <code>next</code> 指针进入环的第一个节点为环的入口节点。如果链表无环，则返回&nbsp;<code>null</code>。</p>

<p>为了表示给定链表中的环，我们使用整数 <code>pos</code> 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 <code>pos</code> 是 <code>-1</code>，则在该链表中没有环。<strong>注意，<code>pos</code> 仅仅是用于标识环的情况，并不会作为参数传递到函数中。</strong></p>

<p><strong>说明：</strong>不允许修改给定的链表。</p>

<ul>
</ul>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png" style="height: 97px; width: 300px;" /></p>

<pre>
<strong>输入：</strong>head = [3,2,0,-4], pos = 1
<strong>输出：</strong>返回索引为 1 的链表节点
<strong>解释：</strong>链表中有一个环，其尾部连接到第二个节点。
</pre>

<p><strong>示例&nbsp;2：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png" style="height: 74px; width: 141px;" /></p>

<pre>
<strong>输入：</strong>head = [1,2], pos = 0
<strong>输出：</strong>返回索引为 0 的链表节点
<strong>解释：</strong>链表中有一个环，其尾部连接到第一个节点。
</pre>

<p><strong>示例 3：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png" style="height: 45px; width: 45px;" /></p>

<pre>
<strong>输入：</strong>head = [1], pos = -1
<strong>输出：</strong>返回 null
<strong>解释：</strong>链表中没有环。
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li>链表中节点的数目范围在范围 <code>[0, 10<sup>4</sup>]</code> 内</li>
	<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
	<li><code>pos</code> 的值为 <code>-1</code> 或者链表中的一个有效索引</li>
</ul>

<p>&nbsp;</p>

<p><strong>进阶：</strong>是否可以使用 <code>O(1)</code> 空间解决此题？</p>

<p>&nbsp;</p>

<p><meta charset="UTF-8" />注意：本题与主站 142&nbsp;题相同：&nbsp;<a href="https://leetcode-cn.com/problems/linked-list-cycle-ii/">https://leetcode-cn.com/problems/linked-list-cycle-ii/</a></p>

<details>
<summary>标签：</summary>
['哈希表', '链表', '双指针']
</details>

<details>
<summary>难度：Medium</summary>
喜欢：74
</details>

---

# 哈希表

## 算法思路

遍历链表，保存节点引用到一个 hash 表：key-value 是节点地址和位置，如果第二次访问到，返回位置

## 复杂度

- 时间复杂度 $O(n)$
- 空间复杂度 $O(n)$

## 代码实现

```java []

```

```cpp []

```

```javascript []
var detectCycle = function (head) {
  let dataMap = new Set();
  while (head) {
    if (dataMap.has(head)) {
      return head;
    }
    dataMap.add(head);
    head = head.next;
  }
  return null;
};
```

## 参考文献

# 快慢指针

## 算法思路

![2021-10-23 pm7.34.16](https://muyids.oss-cn-beijing.aliyuncs.com/2021-10-23%20pm7.34.16-4989569.png)

快指针 移动 速度是慢指针的两倍，因为链表存在环，快慢指针必定会相交于一点

相交的时候，快指针比慢指针多移动了 一圈，也就是 b

快指针 移动 2L = a + (n+1) b

慢指针移动 L = a + nb

L = b，也就是说快慢指针相遇 的位置距离链表头长度为 b

这时候如果把一个指针移动到链表头，然后两个指针都移动 a 长度，相遇的位置就是环的入口节点

**算法思路**

- 快慢指针移动，直到相遇
- 慢指针移动到链表头，两个指针同样的速度移动，相遇即为环的入口

## 复杂度

- 时间复杂度 $O(n)$
- 空间复杂度 $O(1)$

## 代码实现

```java []
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) return null;
        ListNode fast = head.next.next, slow = head.next;
        while (fast != slow) {
            if (fast==null || fast.next == null) return null;
            fast = fast.next.next;
            slow = slow.next;
        }
        slow = head;
        while (fast!=slow){
            fast = fast.next;
            slow = slow.next;
        }
        return slow;
    }
}
```

```cpp []

```

```javascript []
var detectCycle = function (head) {
  if (!head) return null;
  let slow = head,
    fast = head;
  slow = slow.next;
  fast = fast.next;
  if (!fast) return null;
  fast = fast.next;
  if (!fast) return null;
  while (slow != fast) {
    slow = slow.next;
    fast = fast.next;
    if (!fast) return null;
    fast = fast.next;
    if (!fast) return null;
  }
  fast = head;
  while (fast != slow) {
    fast = fast.next;
    slow = slow.next;
  }
  return fast;
};
```

## 参考文献
