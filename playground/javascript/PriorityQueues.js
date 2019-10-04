/**
 * 基本优先队列实现
 * N: 队列长度
 * 解决topK问题，堆是一种特殊的优先队列
 * java,c++语言中有priority_queue的实现
 */
function PriorityQueues(N) {
    this.queue = []
    this.N = N
}

PriorityQueues.prototype.push = function (val) {
    let i = 0    // 查找插入位置
    while (i < this.N && i < this.queue.length && val > this.queue[i]) {
        i++
    }
    if (this.queue.length < this.N) {
        this.queue = [...this.queue.slice(0, i), val, ...this.queue.slice(i, this.queue.length)]
    } else {
        this.queue = [...this.queue.slice(0, i), val, ...this.queue.slice(i, this.queue.length)]
        this.queue.shift()
    }
}

let queue = new PriorityQueues(3)
let arr = [1, 4, 2, 5, 6, 2, 8, 6, 4, 9]
for (let item of arr) {
    queue.push(item)
}
console.log(queue)
