/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {

    let r = []
    function dp(i) {
        if (i == 1) {
            return 1
        }
        if (i == 2) {
            return 2
        }

        if (r[i - 1] === undefined ){
            r[i - 1] = dp(i - 1)
        }
        if (r[i - 2] === undefined ){
            r[i - 2] = dp(i - 2)
        }
        return r[i - 1] + r[i - 2]
    }

    return dp(n)
};

n = 300
let r = climbStairs(n)
console.log(r)
