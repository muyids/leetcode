#include <iostream>
using namespace std;

class Sort {
public:
    vector<int> bubbleSort(vector<int> &nums) {
        vector<int> q;
        for (int i = 0; i < len(nums); i++) {
            q.push_back(nums[i]);
        }
        return q;
    }
};

int main() {
    cout << "hello" << endl;
    return 0;
}
