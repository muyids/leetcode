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

    // char* -> string

    void toCharArr()
    {
        string str = "HelloWorld";
        char *str2 = (char *)str.c_str();  //string => char*
    }

    // string -> char[]

    // new char*
    void newChar()
    {
        char *res = new char[10];
        res[0] = 'a';
    }
};

int main()
{
    cout << "hello" << endl;
    return 0;
}
