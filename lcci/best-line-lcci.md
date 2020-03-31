给定一个二维平面及平面上的 N 个点列表Points，其中第i个点的坐标为`Points[i]=[Xi,Yi]`。请找出一条直线，其通过的点的数目最多。

设穿过最多点的直线所穿过的全部点编号从小到大排序的列表为S，你仅需返回[S[0],S[1]]作为答案，若有多条直线穿过了相同数量的点，则选择S[0]值较小的直线返回，S[0]相同则选择S[1]值较小的直线返回。

```cpp
示例：

输入： [[0,0],[1,1],[1,0],[2,0]]
输出： [0,2]
解释： 所求直线穿过的3个点的编号为[0,2,3]
```

提示：

- 2 <= len(Points) <= 300
- len(Points[i]) = 2

---

## 解题思路

kx + b = y

求k, b

## 代码实现

```cpp
class Solution {
public:
    vector<int> bestLine(vector<vector<int>>& points) {
        // 以斜率为键，斜率出现的次数为值，统计每一轮斜率出现情况，得出最多的值
        map<double, int> m;
        // 初始化返回 0，1
        vector<int> ans({0, 1});
        int tMax = -1;
        double k = 0;

        // 第一个基准点从左到右，第二个基准点从右到左开始扫描
        for(int i = 0; i < points.size(); i++) {
            for(int j = points.size()-1; j >= 0; j--) {
                // 不计算自己
                if(i == j) continue;

                // 计算斜率，分为三种情况 DIFFX = 0, DIFFY = 0, 一般的情况
                if(points[i][0] == points[j][0])
                    k = 0x7fffffffffffffff;
                else if(points[i][1] == points[j][1])
                    k = 0;
                else {
                    k = (points[j][1]-points[i][1]) / ( (points[j][0]-points[i][0]) * 1.0 );
                }

                // 当前的斜率次数+1
                m[ k ]++;

                // 更新当前的位置
                if(m[k] > tMax) {
                    tMax = m[k];
                    ans[0] = i;
                    ans[1] = j;
                }else if(m[k] == tMax) {
                    // 如果当前轮的次数相等，需要更新 Y 到更小的值
                    if(ans[0] == i) ans[1] = min(ans[1], j);
                }
            }
            m.erase(m.begin(), m.end());
        }
        return ans;
    }
};
```
