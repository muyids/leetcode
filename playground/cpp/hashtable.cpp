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
    }
};

int main()
{
    Solution solu = Solution();
    solu.hashtable();
    return 0;
}
