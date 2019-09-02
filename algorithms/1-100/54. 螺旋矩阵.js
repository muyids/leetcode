/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    let direct = [ // r d l u
        [0, 1], [1, 0], [0, -1], [-1, 0]
    ]

    let m = matrix.length
    if (m === 0) return []
    let n = matrix[0].length
    let result = []
    for (let i = 1, p = 0, q = 0, to = 0; i <= m * n; i++) {
        result.push(matrix[p][q])
        matrix[p][q] = undefined
        if (direct[to][0] + p < 0 || direct[to][0] + p >= m
            || direct[to][1] + q < 0 || direct[to][1] + q >= n
            || matrix[direct[to][0] + p][direct[to][1] + q] === undefined) {
            to = ++to % 4
        }
        p = direct[to][0] + p
        q = direct[to][1] + q
    }

    return result
};

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
let r = spiralOrder(matrix)
console.log(r)
