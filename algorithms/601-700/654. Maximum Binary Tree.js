/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
    function dfs(arr){
        if (arr.length === 0){
            return
        }
        let val = Math.max(...arr)
        let root = new TreeNode()
        let idx = nums.findIndex(function (item) {
            return item == val
        })
        root.left = dfs(nums.slice(0, idx))
        root.right = dfs(nums.slice(idx+1, nums.length))
    }

    return dfs(nums)
};

nums = [3,2,1,6,0,5]
// constructMaximumBinaryTree(nums)
