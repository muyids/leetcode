#include <iostream>
#include <vector>
#include <cmath>
#include <queue>
using namespace std;

/******
基本操作

和队列相同:

top 访问队头元素
empty 队列是否为空
size 返回队列内元素个数
push 插入元素到队尾 (并排序)
emplace 原地构造一个元素并插入队列
pop 弹出队头元素
swap 交换内容
******/

class Solution
{
public:
};

int main()
{

  struct cmp
  {
    bool operator()(int l1, int l2) { return l1 > l2; }
  };
  priority_queue<int, vector<int>, cmp> minHeap;
  minHeap.push(8);
  minHeap.push(16);
  minHeap.push(6);
  minHeap.push(8);
  minHeap.push(2);
  minHeap.push(9);
  minHeap.push(4);
  minHeap.push(7);
  cout << minHeap.top() << endl;
  return 0;
}
