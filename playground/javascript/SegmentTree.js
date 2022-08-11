/**
 * 线段树实现
 * 也叫 树状数组 Binary Indexed Tree
 * 用于解决RMQ(Range Minimum/Maximum Query)区间最值问题
 *
 * 树状数组，所以线段树可以用数组来表示
 **/
function SegmentTree(arr) {
  this.arr = arr;
  this.tree = new Array(arr.length << 1);
  this.Build(0, arr.length - 1, 0);
}

// PushUp函数更新节点信息,rt为根的索引值(以求和为例)
SegmentTree.prototype.PushUp = function (rt) {
  this.tree[rt] = this.tree[rt << 1] + this.tree[(rt << 1) | 1];
};

// Build函数建树
// l,r表示当前节点区间，rt表示当前节点编号
SegmentTree.prototype.Build = function (l, r, rt) {
  console.log(1111, l, r);
  if (l == r) {
    //若到达叶节点
    this.tree[rt] = this.arr[l]; //储存数组值
    return;
  }
  let m = (l + r) >> 1;
  //左右递归
  this.Build(l, m, rt << 1);
  this.Build(m + 1, r, (rt << 1) | 1);
  //更新信息
  this.PushUp(rt);
};

let arr = [1, 2, 3];
let tree = new SegmentTree(arr);
console.log(tree.arr, tree.tree);
