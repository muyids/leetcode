/**
 * no pass
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {

    function hasDirection(now, direction) {
        console.log(now, direction)
        if (now[now.length - 1] == direction) {
            return true
        }
        return false
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] == word[0]) {
                let stack = [], pos = 0, posDimension = [i, j, 'S']
                stack.push(posDimension)
                while (pos < word.length && stack.length > 0) {
                    let char = word[pos + 1], find = false
                    // U
                    if (posDimension[0] > 0 && board[posDimension[0] - 1][posDimension[1]] == char && !hasDirection(posDimension[2], 'D')) {
                        posDimension = [posDimension[0] - 1, posDimension[1], posDimension[2] + 'U']
                        find = true
                    } // D
                    if (posDimension[0] < board.length - 1 && board[posDimension[0] + 1][posDimension[1]] == char && !hasDirection(posDimension[2], 'U')) {
                        posDimension = [posDimension[0] + 1, posDimension[1], posDimension[2] + 'D']
                        find = true
                    }// L
                    if (posDimension[1] > 0 && board[posDimension[0]][posDimension[1] - 1] == char && !hasDirection(posDimension[2], 'R')) {
                        posDimension = [posDimension[0], posDimension[1] - 1, posDimension[2] + 'L']
                        find = true
                    }// R
                    if (posDimension[1] < board[0].length - 1 && board[posDimension[0]][posDimension[1] + 1] == char && !hasDirection(posDimension[2], 'L')) {
                        posDimension = [posDimension[0], posDimension[1] + 1, posDimension[2] + 'R']
                        find = true
                    }
                    if (find) {
                        stack.push(posDimension)
                        pos++
                    } else {
                        posDimension = stack.pop()
                        pos--
                    }

                    console.log(stack, pos, word[pos], posDimension)
                }
                if (pos == word.length - 1) {
                    return true
                }
            }
        }
    }

    return false
};

// board = [["C", "A", "A"], ["A", "A", "A"], ["B", "C", "D"]]
// word = "AAB"

board =
    [
        ['A','B','C','E'],
        ['S','F','C','S'],
        ['A','D','E','E']
    ]

word = "ABCCED" // return true.

let result = exist(board, word)
console.log(result)
