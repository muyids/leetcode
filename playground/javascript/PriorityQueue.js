/**
 * 优先队列实现
 * 基于一维有序数组
 *
 * N: 队列长度
 * 解决topK问题，堆是一种特殊的优先队列
 * java,c++语言中有priority_queue的实现
 *
 * 优先队列基于二叉树实现较为推荐，这里是基于一维有序数组
 */
function PriorityQueue(N) {
  this.queue = [];
  this.size = N;
}

PriorityQueue.prototype.push = function (val) {
  let i = 0; // 查找插入位置
  while (i < this.size && i < this.queue.length && val > this.queue[i]) {
    i++;
  }
  if (this.queue.length < this.size) {
    this.queue = [
      ...this.queue.slice(0, i),
      val,
      ...this.queue.slice(i, this.queue.length),
    ];
  } else {
    this.queue = [
      ...this.queue.slice(0, i),
      val,
      ...this.queue.slice(i, this.queue.length),
    ];
    this.queue.shift();
  }
};

PriorityQueue.prototype.getSize = function () {
  return this.size;
};

let queue = new PriorityQueues(3);
let arr = [1, 4, 2, 5, 6, 2, 8, 6, 4, 9];
for (let item of arr) {
  queue.push(item);
}
console.log(queue);
