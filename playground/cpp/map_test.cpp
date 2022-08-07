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
            cout << it->first << ":" << it->second << endl;
        }

        m.find("1") == m.end(); // 是否存在
        m.count("1") == 1;      // 是否存在
    }
};

int main()
{
    Solution solu;
    solu.hashtable();



    unordered_map<int, string> mp;
	mp.insert({1, "I am first"});
	mp.insert({2, "I am second"});
	mp.insert({3, "I am third"});
	
	cout << "---使用c++17 结构化特性---" << endl;
	for (auto [key, val] : mp) {
		cout << key <<"->"<< val << endl;
	}
	cout << endl;
	cout << "---使用迭代器(1)---" << endl;
	for (auto iter : mp) {
		cout << iter.first << "->" << iter.second << endl;
	}
	cout << endl;
	cout << "---使用迭代器(2)---" << endl;
	for (unordered_map<int, string>::iterator iter = mp.begin(); iter != mp.end(); ++iter) {
		cout << iter->first << "->" << iter->second << endl;
	}
	return 0;
}
