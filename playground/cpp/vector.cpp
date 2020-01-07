#include <iostream>
#include <vector>
using namespace std;

class Solution
{
public:
    void play()
    {
        vector<int> dp;
        // vector 头部添加元素
        dp.insert(dp.begin(), 1);
        // 尾部添加元素
        dp.push_back(3);
        // 指定位置添加元素
        dp.insert(dp.begin() + 1, 2);

        // 删除头部
        dp.erase(dp.begin());
        // 删除尾部
        dp.erase(dp.end());
    };
};

int main()
{
    Solution solu = Solution();
    solu.play();
    return 0;
}
