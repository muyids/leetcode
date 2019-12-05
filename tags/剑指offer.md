## 13.找出数组中重复的数字.md



相似题目

- LeetCode 442.数组中重复的数据

---

思路：

抽屉原理 + 异或交换数字不占用额外空间, 时间复杂度O(N) + 空间复杂度O(1)

```javascript
let a = 1, b = 2
a = a ^ b
b = a ^ b
a = a ^ b
console.log(a, b) // 2, 1
```

---


```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
    let ans = new Set()
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === i + 1) continue
        if (nums[nums[i] - 1] == nums[i]) {
            ans.add(nums[i])
        } else {
            let k = nums[i] - 1
            nums[i] = nums[i] ^ nums[k]
            nums[k] = nums[i] ^ nums[k]
            nums[i] = nums[i] ^ nums[k]
            i--
        }
    }
    return [...ans]
};
```
