/**
 * 树状数组实现堆，类似线段树
 * 基于完全二叉树结构
 * @param N
 * @constructor
 */
let heap = []

function insert(val) {
    heap.push(val);
    shiftUp(heap.length - 1);
}

function swap(idx1, idx2) {
    let temp = heap[idx1];
    heap[idx1] = heap[idx2];
    heap[idx2] = temp;
}

function shiftUp(idx) {
    let _idx = Math.floor((idx - 1) / 2);
    if (idx != 0 && heap[_idx] < heap[idx]) {
        swap(_idx, idx);
        shiftUp(_idx);
    }
}

function shiftDown(idx) {
    if (idx * 2 + 1 < heap.length && heap[idx * 2 + 1] > heap[idx]) {
        swap(idx * 2 + 1, idx);
        shiftDown(idx * 2 + 1);
    } else if (idx * 2 + 2 < heap.length && heap[idx * 2 + 2] > heap[idx]) {
        swap(idx * 2 + 2, idx);
        shiftDown(idx * 2 + 2);
    }
}

function remove() {
    swap(0, heap.length - 1);
    heap.pop();
    shiftDown(0);
    return heap[0];
}

[8,3,5,1,6,7,3,8,2,3].map(insert)
console.log(heap)