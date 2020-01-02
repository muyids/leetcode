#include <iostream>
#include <vector>
#include <queue>

using namespace std;

class cmp
{
public:
    bool operator()(int &n1, int &n2)
    {
        return n1 < n2;
    }
};

class Solution
{
public:
    void study() // 大顶堆学习
    {
        priority_queue<int, vector<int>, cmp> heap; // 大顶堆;保存建筑物高度和下标
        heap.push(1);
        heap.push(2);
        heap.pop();
        int top = heap.top();

        cout << top << endl;
    }
};

int main()
{
    Solution solu = Solution();
    solu.study();
    return 0;
}
