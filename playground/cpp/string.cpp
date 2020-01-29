#include <iostream>

using namespace std;

class Sort
{
public:
    string reverse(string s)
    {
        return reverse(s.begin(), s.end());
    }

    int atoiTest(string s)
    {
        return atoi(s.c_str());
    }

    string itoa(int z)
    {
        return to_string(z);
    }
};

int main()
{
    cout << "hello" << endl;
    return 0;
}
