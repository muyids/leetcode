/**
 * 字典树（Trie树）
 * 也叫 前缀树
 */
function Trie() {
  this.root = new TrieNode(null);
  this.maxWord = "";
}

/**
 * 节点
 * @param {*} key
 */
function TrieNode(key) {
  this.key = key; // 节点字符
  this.children = []; // 子节点集合
  this.has = false; // 字符串终点标识
}

Trie.prototype = {
  // 插入单词
  insertData: function (str) {
    this.insert(str, this.root);
  },
  insert: function (str, node) {
    for (let c of str) {
      let index = this._indexOf(node.children, c);
      if (-1 === index) {
        let tmpNode = new TrieNode(c);
        node.children.push(tmpNode);
        node = tmpNode;
      } else {
        node = node.children[index];
      }
    }
    node.has = true;
  },
  // 查找单词
  search: function (word) {
    let node = this.root;
    for (let c of word) {
      let index = this._indexOf(node.children, c);
      if (-1 === index) {
        return false;
      }
      node = node.children[index];
    }
    return true;
  },
  // 删除单词
  delete: function (str) {
    let node = this.root;
  },
  // delNext: (parent, index, str, delStr) => boolean, // 递归
  // 打印树上的所有单词
  printData: function () {
    this.printHelper(this.root, "");
  },
  printHelper: function (node, data) {
    // 递归
    if (node.has === true) {
      if (data.length > this.maxWord.length) {
        console.log("change", this.maxWord, data);
        this.maxWord = data;
      } else if (data.length === this.maxWord.length && this.maxWord > data) {
        console.log("change", this.maxWord, data);
        this.maxWord = data;
      }
    }
    for (let n of node.children) {
      if (n.has === true) {
        this.printHelper(n, data + n.key);
      }
    }
  },
  _indexOf: function (children, key) {
    return children.findIndex(function (node) {
      return node.key === key;
    });
  },
};

module.exports = {
  Trie: Trie,
  TrieNode: TrieNode,
};
