
## How Far Can We Reach Use Ropes And Bricks (Google Onsite)

From: Google Onsite

![题目链接](https://muyids.oss-cn-beijing.aliyuncs.com/Google|Onsite|how-far-can-we-reach-use-ropes-and-bricks.png)

- https://leetcode.com/discuss/interview-question/528584/Google-or-Onsite-or-How-Far-Can-We-Reach-using-Rope-and-Bricks


贪心思路

```cpp
class Solution {

public:
    int RopeBrick(vector<int> &H, int b, int r) {

        int n = H.size();
        if (r >= n - 1 || n < 2)return n - 1;

        int i, s = 0, total_brick = 0; // s：用绳子替代的砖
        priority_queue<int, vector<int>, greater<int>> pq;

        for (i = 1; i < n; i++) {
            int d = H[i] - H[i - 1];
            if (d <= 0)continue;

            total_brick += d;
            if (pq.size() < r) {
                s += d;
                pq.push(d);
            } else if (pq.top() < d) {
                s += d - pq.top();
                pq.pop();
                pq.push(d);
            }

            if (total_brick - s > b)return i - 1;
        }
        return n - 1;
    }
};
```
