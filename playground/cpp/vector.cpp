#include <iostream>
#include <vector>
using namespace std;

class Solution
{
public:

    // 删除元素
    void erase_x(){
        vector<int> v = {1,2,3,4,5,6,7};
        v.erase(v.begin()+3, v.end());
        for (int i = 0; i < v.size(); i++) {
            printf("v[%d]=%d ", i, v[i]);
        }
    }

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
        auto iter = find(input.begin(), input.end(), number); //返回的是一个迭代器指针
        if (iter == input.end())
            return -1;
        return distance(input.begin(), iter);
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

    /**
     * 排序
     */
    static bool cmp(int a, int b){
        return a>b;
    }
    void sortTest(){
        vector<int> v = {2, 1, 5,3, 8, 9,6,7};
        sort(v.begin(), v.end(), cmp);
        for (int i = 0; i < v.size(); i++) {
            printf("v[%d]=%d ", i, v[i]);
        }

    }
};

int main()
{
    Solution solution ;
    solution.sortTest();
    return 0;
}
