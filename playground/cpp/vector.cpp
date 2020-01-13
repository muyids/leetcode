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
        dp.pop_back();
    };

    int getEnd(vector<int> v)
    {
        return v.back();
    }
    // 判断某元素是否存在
    bool is_element_in_vector(vector<int> v, int element)
    {
        return find(v.begin(), v.end(), element) != v.end();
    }

    // 寻找位置
    int findPosVector(vector<int> input, int number)
    {
        vector<int>::iterator iter = std::find(input.begin(), input.end(), number); //返回的是一个迭代器指针
        if (iter == input.end())
            return -1;
        return std::distance(input.begin(), iter);
    }

    // 去重
    vector<int> unique_element_in_vector(vector<int> v)
    {
        vector<int>::iterator vector_iterator;
        sort(v.begin(), v.end());
        vector_iterator = unique(v.begin(), v.end());
        if (vector_iterator != v.end())
        {
            v.erase(vector_iterator, v.end());
        }
        return v;
    }

    // 求交集
    vector<int> vectors_intersection(vector<int> v1, vector<int> v2)
    {
        vector<int> v;
        sort(v1.begin(), v1.end());
        sort(v2.begin(), v2.end());
        set_intersection(v1.begin(), v1.end(), v2.begin(), v2.end(), back_inserter(v)); //求交集
        return v;
    }

    // 求并集
    vector<int> vectors_set_union(vector<int> v1, vector<int> v2)
    {
        vector<int> v;
        sort(v1.begin(), v1.end());
        sort(v2.begin(), v2.end());
        set_union(v1.begin(), v1.end(), v2.begin(), v2.end(), back_inserter(v)); //求交集
        return v;
    }
};

int main()
{
    Solution solu = Solution();
    solu.play();
    return 0;
}
