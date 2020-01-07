#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>

using namespace std;

/**
 * hashtable playground
 **/
class Solution
{
public:
    void hashtable()
    {
        unordered_map<string, vector<int>> m;
        m["hello"].push_back(1);

        for (auto it = m.begin(); it != m.end(); it++)
        {
            cout << it->first << ":" << it->second.front() << endl;
        }

        m.find("1") == m.end(); // 是否存在
        m.count("1") == 1;      // 是否存在
    }
};

int main()
{
    Solution solu = Solution();
    solu.hashtable();
    return 0;
}
