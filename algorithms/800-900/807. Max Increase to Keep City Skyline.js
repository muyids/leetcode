/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxIncreaseKeepingSkyline = function (grid) {

    let ud = Array(grid[0].length)
        , lf = Array(grid.length)

    for (let j = 0; j < ud.length; j++) {
        let column = []
        for (let i = 0; i < grid.length; i++) {
            column.push(grid[i][j])
        }
        ud[j] = Math.max(...column)
    }

    for (let i = 0; i < lf.length; i++) {
        let row = []
        for (let j = 0; j < grid[0].length; j++) {
            row.push(grid[i][j])
        }
        lf[i] = Math.max(...row)
    }

    let sum = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            sum += ( Math.min(lf[i], ud[j]) - grid[i][j])
        }

    }
    return sum
};

grid = [[3, 0, 8, 4], [2, 4, 5, 7], [9, 2, 6, 3], [0, 3, 1, 0]]
let result = maxIncreaseKeepingSkyline(grid)
console.log(result)
