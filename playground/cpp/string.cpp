#include <iostream>
#include <string>
#include <vector>
#include <string.h>

using namespace std;

void SplitString(std::vector<std::string> &v, const std::string &s,  const std::string &c) {
    std::string::size_type pos1, pos2;
    pos2 = s.find(c);
    pos1 = 0;
    while (std::string::npos != pos2) {
        v.push_back(s.substr(pos1, pos2 - pos1));
        pos1 = pos2 + c.size();
        pos2 = s.find(c, pos1);
    }
    if (pos1 != s.length()) v.push_back(s.substr(pos1));
}

string reverse(string s){
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

class Sort
{
public:



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
