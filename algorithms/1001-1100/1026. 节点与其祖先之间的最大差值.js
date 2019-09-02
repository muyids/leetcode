/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 *
 * 广度优先搜索
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxAncestorDiff = function(root) {

    if (root == null){
        return 0
    }
    let floor = [{node: root, scope : [root.val, root.val]}]
        , max = 0
    do {
        let nextFloor = []
        for (let root of floor){

            max = Math.max(max, root.scope[1] - root.scope[0])
            if (root.node.left !== null){
                let item = {
                    node: root.node.left,
                    scope: [
                        Math.min(root.node.left.val, root.scope[0]),
                        Math.max(root.node.left.val, root.scope[1])]
                }
                nextFloor.push(item)
            }
            if (root.node.right !== null){
                let item = {
                    node: root.node.right,
                    scope: [Math.min(root.node.right.val, root.scope[0]),
                        Math.max(root.node.right.val, root.scope[1])]
                }
                nextFloor.push(item)
            }
            floor = nextFloor
        }
    } while (floor.length > 0)

    return max
};
