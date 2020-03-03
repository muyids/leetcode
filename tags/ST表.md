# ST表

ST表（Sparse Table)

解决`静态RMQ`（Range Minimum/Maxium Query，区间最值查询）问题的数据结构

---

## 板子

```cpp
#include <bits/stdc++.h>

using namespace std;
#define IO ios::sync_with_stdio(false);cin.tie(0);

const int maxn = 1e5 + 5;
const int lgn = 19;

int n, q;
int lg[maxn], f[maxn][19];

void init() { // log函数预处理
    lg[1] = 0, lg[2] = 1;
    for (int i = 3; i < maxn; ++i) {
        lg[i] = lg[i >> 1] + 1;
    }
}

void st() {
    for (int j = 1; j <= 19; ++j) {
        for (int i = 0; i + (1 << j) - 1 < n; i++) {
            f[i][j] = max(f[i][j - 1], f[i + (1 << j - 1)][j - 1]);
        }
    }
}

int Q(int l, int r) {
    int len = lg[r - l + 1];
    return max(f[l][len], f[r - (1 << len) + 1][len]);
}

int main() {
    IO;
    init();
    cin >> n;

    for (int i = 0; i < n; i++) cin >> f[i][0];

    st();
    cin >> q;
    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << Q(a, b) << endl;
    }
    return 0;
}
```

---

## 扩展LCA倍增

- https://www.luogu.com.cn/blog/morslin/solution-p3379

## 课程学习

- https://www.bilibili.com/video/av82319334

---

## 练习题

### cdoj1591

### AcWing1273. 天才的记忆
