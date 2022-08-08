重新定义 sort 运算

```java
class Solution {
    public String minNumber(int[] nums) {
        List<Integer> w = Arrays.stream(nums).boxed().sorted(new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return (String.valueOf(o1) + o2).compareTo(String.valueOf(o2) + o1);
            }
        }).collect(Collectors.toList());

        final List<String> res = w.stream().map(String::valueOf).collect(Collectors.toList());
        return String.join("", res);
    }
}
```

```cpp
class Solution {
public:
    static bool cmp(int a, int b){
        string as = to_string(a), bs = to_string(b);
        return as + bs < bs + as;
    }
    string minNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end(), cmp);
        string x;
        for(auto s: nums) x+= to_string(s);
        return x;
    }
};
```
