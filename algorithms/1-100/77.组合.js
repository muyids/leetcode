/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {

    let result = []

    let A = []
    for (let i = 0; i < n; i++) {
        A[i] = i + 1
    }

    function backtrace(i, row) {
        if (i === k) {
            result.push([...row])
            return
        }

        for (let j = row[row.length - 1] || 1; j <= n; j++) {
            if (row.indexOf(j) === -1) {
                let arr = [...row]
                arr.push(j)
                backtrace(i + 1, arr)
            }
        }
    }

    backtrace(0, [])

    return result
};

n = 4, k = 2
let re = combine(n, k)
console.log(re)
