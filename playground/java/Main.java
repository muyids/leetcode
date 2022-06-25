import java.util.*;


class Solution {
    public int change(int V, int[] coins) {
        int f[] = new int[V + 1];
        Arrays.fill(f, 0x3f3f3f3f);
        f[0] = 1;
        for (int c : coins) {
            for (int i = c; i<=V; i++){
                f[i] += f[i-c];
            }
        }
        return f[V] == 0x3f3f3f3f ? -1 : f[V];
    }
}

public class Main {

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] arr = {1, 2, 5};
        int r = solution.change(5, arr);
        System.out.println(r);

    }

}