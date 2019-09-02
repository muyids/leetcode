/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

function Tree() {
    this.root = null
}

module.exports = Tree

Tree.prototype.init = function (valArr) {
    if (valArr.length === 0) {
        return null
    }
    this.root = new TreeNode(valArr[0])
    let floor = [this.root]
    let i = 0
    do {
        let next = []
        for (let node of floor) {
            if (node === null) {
                i += 2
                next.push(null)
                next.push(null)
                continue
            }
            i++
            if (valArr[i] === null || valArr[i] === undefined) {
                node.left = null
                next.push(null)
            } else {
                node.left = new TreeNode(valArr[i])
                next.push(node.left)
            }
            i++
            if (valArr[i] === null || valArr[i] === undefined) {
                node.right = null
                next.push(null)
            } else {
                node.right = new TreeNode(valArr[i])
                next.push(node.right)
            }
        }
        floor = next
    } while (i < valArr.length)
}

Tree.prototype.bfs = function () {
    if (this.root === null) {
        return
    }
    let floor = [this.root]
    do {
        let next = []
        for (let node of floor) {
            if (node.left !== null) {
                next.push(node.left)
            }
            if (node.right !== null) {
                next.push(node.right)
            }
        }
        floor = next
    } while (floor.length > 0)
}


// 中序遍历非递归
var inorderTraversal = function (root) {
    if (root == null) return []
    let stack = [], ans = []
    let p = root
    while (p || stack.length > 0) {
        while (p) {  // 左孩子全部入栈
            stack.push(p)
            p = p.left
        }
        // 弹出栈顶
        p = stack.pop()
        ans.push(p.val)

        // 指向右孩子
        p = p.right
    }

    return ans
};


// 最大深度
var maxDepth = function (root) {
    function dfs(root, depth) {
        if (!root) return depth
        return Math.max(dfs(root.left, depth + 1), dfs(root.right, depth + 1))
    }

    return dfs(root, 0)
}


// 543. 二叉树的直径
var diameterOfBinaryTree = function (root) {
    if (!root) return 0
    let max = 0

    function dfs(root) {
        if (!root) return 0

        let left = dfs(root.left)
        let right = dfs(root.right)

        max = Math.max(max, left + right)
        return Math.max(left + 1, right + 1)
    }

    dfs(root)
    return max
};


let tree = new Tree()


tree.init([1, 2, 3])

let depth = diameterOfBinaryTree(tree.root)
console.log(depth)
