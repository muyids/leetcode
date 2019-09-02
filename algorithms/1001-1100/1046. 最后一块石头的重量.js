/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {

    while (stones.length > 1) {
        stones.sort((a, b) => a - b)
        let large = stones.pop()
            , small = stones.pop()
        if (large > small) {
            stones.push(large - small)
        }
    }
    return stones.length === 1? stones[0]:0
};

nums = [1, 2]
let re = lastStoneWeight(nums)
console.log(re)
