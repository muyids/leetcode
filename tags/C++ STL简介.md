# C++ STL

## 输入输出

```cpp
while(scanf("%d %d",&a, &b) != EOF){
    cout << getCounts(n) << endl;
}
```

```cpp
int k;
cin >> k; // k是行数
while (k--){
    int a, b;
    cin >> a >> b;
}
```

## 字符串

字符串转数字 atoi(s.c_str());
数字转字符串 to_string(123)

## 数学

#define MaxN  0x3f3f3f3f // 无穷大
#define MinN  0xc0c0c0c0 // 无穷小

## vector, 变长数组，倍增的思想

    size()  返回元素个数
    empty()  返回是否为空
    clear()  清空
    front()/back()
    push_back()/pop_back()
    begin()/end()
    []
    支持比较运算，按字典序
    slice : vector<int>(arr.begin()+i, arr.begin()+j)

## pair<int, int>

    first, 第一个元素
    second, 第二个元素
    支持比较运算，以first为第一关键字，以second为第二关键字（字典序）

## string，字符串

    size()/length()  返回字符串长度
    empty()
    clear()
    substr(起始下标，(子串长度))  返回子串
    c_str()  返回字符串所在字符数组的起始地址

## queue, 队列

    size()
    empty()
    push()  向队尾插入一个元素
    front()  返回队头元素
    back()  返回队尾元素
    pop()  弹出队头元素

## priority_queue, 优先队列，默认是大根堆

    push()  插入一个元素
    top()  返回堆顶元素
    pop()  弹出堆顶元素
    priority_queue<int> q; // 大根堆
    定义成小根堆的方式：priority_queue<int, vector<int>, greater<int>> q;


## stack, 栈

    size()
    empty()
    push()  向栈顶插入一个元素
    top()  返回栈顶元素
    pop()  弹出栈顶元素

## deque, 双端队列

    size()
    empty()
    clear()
    front()/back()
    push_back()/pop_back()
    push_front()/pop_front()
    begin()/end()
    []

## set, map, multiset, multimap, 基于平衡二叉树（红黑树），动态维护有序序列

    size()
    empty()
    clear()
    begin()/end()
    ++, -- 返回前驱和后继，时间复杂度 O(logn)

### set/multiset

        insert()  插入一个数
        find()  查找一个数
        count()  返回某一个数的个数
        erase()
            (1) 输入是一个数x，删除所有x   O(k + logn)
            (2) 输入一个迭代器，删除这个迭代器
        lower_bound()/upper_bound()
            lower_bound(x)  返回大于等于x的最小的数的迭代器
            upper_bound(x)  返回大于x的最小的数的迭代器

### map/multimap

        insert()  插入的数是一个pair
        erase()  输入的参数是pair或者迭代器
        find()
        []  注意multimap不支持此操作。 时间复杂度是 O(logn)
        lower_bound()/upper_bound()

### unordered_set, unordered_map, unordered_multiset, unordered_multimap, 哈希表

    和上面类似，增删改查的时间复杂度是 O(1)
    不支持 lower_bound()/upper_bound()， 迭代器的++，--

### bitset, 圧位

    bitset<10000> s;
    ~, &, |, ^
    >>, <<
    ==, !=
    []

    count()  返回有多少个1

    any()  判断是否至少有一个1
    none()  判断是否全为0

    set()  把所有位置成1
    set(k, v)  将第k位变成v
    reset()  把所有位变成0
    flip()  等价于~
    flip(k) 把第k位取反

## 技巧

unordered_map + priority_queue 应用于有增删操作的求最值操作中
unordered_map用作计数器，从堆顶取极值的时候，判断堆顶元素个数是否大于0

## 由数据范围反推算法复杂度以及算法内容

一般ACM或者笔试题的时间限制是1秒或2秒。
在这种情况下，C++代码中的操作次数控制在 10^7 为最佳。

下面给出在不同数据范围下，代码的时间复杂度和算法该如何选择：

- n≤30, 指数级别, dfs+剪枝，状态压缩dp
- n≤100 => O(n3)，floyd，dp
- n≤1000 => O(n2)，O(n2logn)，dp，二分
- n≤10000 => O(n∗n‾√)O(n∗n)，块状链表
- n≤100000 => O(nlogn) => 各种sort，线段树、树状数组、set/map、heap、dijkstra+heap、spfa、求凸包、求半平面交、二分
- n≤1000000 => O(n), 以及常数较小的 O(nlogn) 算法 => hash、双指针扫描、kmp、AC自动机，常数比较小的 O(nlogn) 的做法：sort、树状数组、heap、dijkstra、spfa
- n≤10000000 => O(n)O(n)，双指针扫描、kmp、AC自动机、线性筛素数
- n≤10^9 => O(n‾√)O(n)，判断质数
- n≤10^18 => O(logn)，最大公约数
