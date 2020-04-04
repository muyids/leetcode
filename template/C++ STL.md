# C++ STL

## 目录

- [输入输出](#输入输出)
- [内存赋值](#内存赋值)
- [字符串](#字符串)

---


## 输入输出

- 输入数字 `cin >> a`
- 输入字符 `getline(cin, s);` //考虑到中间会有空格，所以用输入流getline。
- cin 和 scanf 读入字符串时遇到空格就停止了。

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

- Q: 请问为为什么是 `while(~scanf("%d%d",&n,&m))`，而不是 `while(scanf("%d%d",&n,&m))`？
- A: 论如何正确认识scanf的返回值。百科里说什么没读到n和m返回0对吧，下一句，如果碰到错误，比如`End Of File`这个，返回常量EOF，EOF一般默认定义为-1，-1按位取反就是0，其他的按位取反当然非0、最保险的写法其实是，`scanf()!=EOF`

## 内存赋值

### memset

在memset使用时要千万小心，在**给char以外的数组赋值时**，只能初始化为**0或者-1**

## 字符串

stdlib.h库

- 字符串转数字 atoi(s.c_str());
- 将数字字符串(如”136”)转换为int型：int i = atoi(str);
- 将数字字符串(如”136”)转换为float型：int f = atof(str);
- 将数字字符串(如”136”)转换为long型：int l = atol(str);

- 数字转字符串 to_string(123)

字符插入到字符串指定位置

- 插到尾部 `s += c`
- 插到头部 `s.insert(s.begin(), c)`
- 插到中间 `s.insert(s.begin() + 3, 'i')`

- 删除区间 `s.erase(s.begin() + 3, s.begin() + 5)`
- 删除头部空格`s.erase(0, s.find_first_not_of(" "));`
- 删除尾部空格`s.erase(s.find_last_not_of(" ") + 1);`
- 反转字符串 `reverse(s.begin(),s.end());`

string.h库

- 求字符串长度： int len = strlen(str);
- 字符串复制： strcpy();
- 字符串比较： strcmp();
- 字符串拼接： strcat();
- 查询字串： strchr();
- 查询子串： strstr();

## 数学

`#define MaxN  0x3f3f3f3f` // 无穷大
`#define MinN  0xc0c0c0c0` // 无穷小

## vector

变长数组，倍增的思想

- size()  返回元素个数
- empty()  返回是否为空
- clear()  清空
- front()/back()
- push_back()/pop_back()
- begin()/end()
- 支持比较运算，按字典序
- slice : vector<int>(arr.begin()+i, arr.begin()+j)

## pair<int, int>

- first, 第一个元素
- second, 第二个元素
- 支持比较运算，以first为第一关键字，以second为第二关键字（字典序）

## string，字符串

- size()/length()  返回字符串长度
- empty()
- clear()
- substr(起始下标，(子串长度))  返回子串
- c_str()  返回字符串所在字符数组的起始地址
- append(1, c) // 末尾追加一个字符
- erase(str.begin()) // 删除开头
- erase(str.end() -1) // 删除结尾

## queue, 队列

- size()
- empty()
- push()  向队尾插入一个元素
- front()  返回队头元素
- back()  返回队尾元素
- pop()  弹出队头元素

## priority_queue, 优先队列，默认是大根堆

- push()  插入一个元素
- top()  返回堆顶元素
- pop()  弹出堆顶元素
- priority_queue<int> q; // 大根堆
- 定义成小根堆的方式：priority_queue<int, vector<int>, greater<int>> q;

## stack, 栈

- size()
- empty()
- push()  向栈顶插入一个元素
- top()  返回栈顶元素
- pop()  弹出栈顶元素

## deque, 双端队列

- size()
- empty()
- clear()
- front()/back()
- push_back()/pop_back()
- push_front()/pop_front()
- begin()/end()

## set, map, multiset, multimap, 基于平衡二叉树（红黑树），动态维护有序序列

- size()
- empty()
- clear()
- begin()/end()
- ++, -- 返回前驱和后继，时间复杂度 O(logn)

### set/multiset

- insert()  插入一个数
- find()  查找一个数
- count()  返回某一个数的个数
- erase()
  - 输入是一个数x，删除所有x   O(k + logn) 
  - 输入一个迭代器，删除这个迭代器
- lower_bound()/upper_bound()
  - lower_bound(x)  返回大于等于x的最小的数的迭代器
  - upper_bound(x)  返回大于x的最小的数的迭代器

### map/multimap

- insert()  插入的数是一个pair
- erase()  输入的参数是pair或者迭代器
- find()
- []  注意multimap不支持此操作。 时间复杂度是 O(logn)
- lower_bound()/upper_bound()

### unordered_set, unordered_map, unordered_multiset, unordered_multimap, 哈希表

- 和上面类似，增删改查的时间复杂度是 O(1)
- 不支持 `lower_bound()/upper_bound()`， 迭代器的++，--

### bitset, 圧位

```cpp
bitset<10000> s;
~, &, |, ^
>>, <<
==, !=
[]
```

- count()  返回有多少个1

- any()  判断是否至少有一个1
- none()  判断是否全为0

- set()  把所有位置成1
- set(k, v)  将第k位变成v
- reset()  把所有位变成0
- flip()  等价于~
- flip(k) 把第k位取反

## 技巧

- unordered_map + priority_queue 应用于有增删操作的求最值操作中
- unordered_map用作计数器，从堆顶取极值的时候，判断堆顶元素个数是否大于0

## 由数据范围反推算法复杂度以及算法内容

![由数据范围反推算法复杂度以及算法内容](https://muyids.oss-cn-beijing.aliyuncs.com/ac-oo.png)
