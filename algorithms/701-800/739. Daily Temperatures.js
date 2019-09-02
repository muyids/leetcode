/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
	return T.map(function(t, i) {
		for (let days = 0; i + days + 1 < T.length ; days++) {
			if (T[i + days + 1] > t){
				return days + 1
			}
		}
		return 0
	})
};