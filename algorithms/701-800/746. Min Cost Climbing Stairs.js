/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
    let result = []

    function db(len) {
        if (len < 2) {
            return 0
        }

        if (result[len - 1] === undefined) {
            result[len - 1] = db(len - 1)
        }

        if (result[len - 2] === undefined) {
            result[len - 2] = db(len - 2)
        }

        return Math.min(result[len - 1] + cost[len - 1],
            result[len - 2] + cost[len - 2])
    }

    return db(cost.length)
};

cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
let r = minCostClimbingStairs(cost)
console.log(r)
