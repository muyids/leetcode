给定两条线段（表示为起点start = {X1, Y1}和终点end = {X2, Y2}），如果它们有交点，请计算其交点，没有交点则返回空值。

要求浮点型误差不超过10^-6。若有多个交点（线段重叠）则返回 X 值最小的点，X 坐标相同则返回 Y 值最小的点。

```cpp
示例 1：

输入：
line1 = {0, 0}, {1, 0}
line2 = {1, 1}, {0, -1}
输出： {0.5, 0}
示例 2：

输入：
line1 = {0, 0}, {3, 3}
line2 = {1, 1}, {2, 2}
输出： {1, 1}
示例 3：

输入：
line1 = {0, 0}, {1, 1}
line2 = {1, 0}, {2, 1}
输出： {}，两条线段没有交点
```

提示：

- 坐标绝对值不会超过 2^7
- 输入的坐标均是有效的二维坐标

---

## 解题思路


## 代码实现

```cpp
class Solution {
public:
    vector<double> intersection(vector<int>& start1, vector<int>& end1, vector<int>& start2, vector<int>& end2) {
        vector<double> ans;
        int X1 = start1[0], X2 = end1[0], A1 = start2[0], A2 = end2[0];
        int Y1 = start1[1], Y2 = end1[1], B1 = start2[1], B2 = end2[1];
        int V1 = X2 - X1, P1 = Y2 - Y1;
        int L1 = A1 - X1, M1 = B1 - Y1;
        int L2 = A2 - X1, M2 = B2 - Y1;
        int crossX1A1 = cross(V1, P1, L1, M1), crossX1A2 = cross(V1, P1, L2, M2);
        //需要注意同时需要判断另一条线段是否能把两个端点放在两侧
        int crossA1X1 = cross(A2 - A1, B2 - B1, X1 - A1, Y1 - B1), crossA1X2 = cross(A2 - A1, B2 - B1, X2 - A1, Y2 - B1);
        int crossSign =  crossX1A1 * crossX1A2;
        int crossSign2 = crossA1X1 * crossA1X2;
        if (crossSign < 0 && crossSign2 < 0) {
            // 有交点 且端点不在线上
            double s1 = abs(crossX1A1), s2 = abs(crossX1A2);
            // 此时 ans1 ans2必不为0
            double x1 = (A1 + (s1/s2)*A2) / (1 + (s1/s2));
            double y1 = (B1 + (s1/s2)*B2) / (1 + (s1/s2));
            ans.push_back(x1);
            ans.push_back(y1);
            return ans;
        } else if (crossSign == 0 || crossSign2 == 0) {
            // 不共线一端端点在线上
            if (crossX1A1 == 0 && crossX1A2 != 0) {
                // (A1, B1)交点
                ans.push_back((double)A1);
                ans.push_back((double)B1);
                return ans;
            }
            if (crossX1A1 != 0 && crossX1A2 == 0) {
                // (A1, B1)交点
                ans.push_back((double)A2);
                ans.push_back((double)B2);
                return ans;
            }
            if (crossA1X1 == 0 && crossA1X2 != 0) {
                ans.push_back((double)X1);
                ans.push_back((double)Y1);
                return ans;
            }
            if (crossA1X1 != 0 && crossA1X2 == 0) {
                ans.push_back((double)X2);
                ans.push_back((double)Y2);
                return ans;
            }
            // 共线
            // 四个点(X1, Y1) (X2, Y2) (A1, B1) (A2, B2)
            int X = 0, Y = 0, A = 0, B = 0;
            getMiniCoor(X, Y, X1, Y1, X2, Y2);
            getMiniCoor(A, B, A1, B1, A2, B2);
            // 最小交点必在(X, Y) 或者 (A, B)
            int ANSX = 0, ANSY = 0;
            // 相交
            bool b1 = inside(X, Y, A1, B1, A2, B2), b2 = inside(A, B, X1, Y1, X2, Y2);
            if (b1 || b2) {
                if (b1 && b2) getMiniCoor(ANSX, ANSY, X, Y, A, B);
                else if (b1) {
                    ANSX = X;
                    ANSY = Y;
                } else {
                    ANSX = A;
                    ANSY = B;
                }
                ans.push_back((double)ANSX);
                ans.push_back((double)ANSY);
                return ans;
            }
            // 相离
            return ans;
        } else{
            // 不相交
            return ans;
        }
    }
    // (X1, Y1) x (X2, Y2)
    int cross(int X1, int Y1, int X2, int Y2) {
        return X1*Y2 - X2*Y1; // 叉乘为0则共线 (X1,Y1)逆时针旋转共线为正 顺时针旋转共线为负
    }
    // 判断点(ux, uy)是否在(X1, Y1) (X2, Y2) 线段上
    bool inside(int ux, int uy, int X1, int Y1, int X2, int Y2) {
        return ux >= min(X1, X2) && ux <= max(X1, X2) && uy >= min(Y1, Y2) && uy <= max(Y1, Y2);
    }
    void getMiniCoor(int &X, int &Y, int X1, int Y1, int X2, int Y2) {
        if (X1 == X2 && Y1 <= Y2 || X1 < X2) {
            X = X1;
            Y = Y1;
        } else {
            X = X2;
            Y = Y2;
        }
        return;
    }
};
```
