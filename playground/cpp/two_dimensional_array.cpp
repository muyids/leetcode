#include<iostream>
#include<vector>
using namespace std;

class TwoDimensionalArray {
public:
    void init(){
        int m = 3,n = 2;
        vector<vector<int>> dp(3, vector<int>(n, 0));
        for (int i =0; i< m; i++){
            for (int j = 0; j< n; j++){
                cout << dp[i][j] << ' ';
            };
            cout << endl;
        };
    };
};

int main(){
    TwoDimensionalArray two = TwoDimensionalArray();
    two.init();
    return 0;
}
