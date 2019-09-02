/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {

    this.nums = nums
};

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j) {
    let sum = 0
    for (let p = i; p <= j; p++){
        sum += this.nums[p]
    }
    return sum
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
nums = [-2, 0, 3, -5, 2, -1]
var obj = new NumArray(nums)
var param_1 = obj.sumRange(0, 2)
console.log(param_1)
