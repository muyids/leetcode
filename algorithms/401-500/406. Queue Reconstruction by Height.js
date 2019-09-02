/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function(people) {
	let result = new Array(people.length)

	// 按身高排序
	let hSort = people.sort(function(a, b) {
		return a[0] - b[0]
	})

	// 遍历按身高排序的队列
	for (let i = 0; i < hSort.length; i++) {
		let item = hSort[i]

		let pos = getPos(item[0], item[1])
		
		// 要插入的位置为 遍历result直到遇到k个人高于等于h,得到第一个空位置
		function getPos(h, k) {
			let count = 0
			for (let pos = 0; pos < result.length; pos++) {
				if (k == count) {
					if (result[pos] == null) {
						return pos
					} else {
						continue
					}
				}

				if (result[pos] == null) {
					count++
					continue
				}

				if (h <= result[pos][0]) {
					count++
					continue
				}
			}
		}
		result[pos] = item
	}

};