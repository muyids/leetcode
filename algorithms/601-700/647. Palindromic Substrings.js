/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {

	function huiwen(s){
		let start = 0, end = s.length -1
		while (start < end){
			if (s[start] == s[end]){
				start++; end--;
			} else {
				return false
			}
		}	
		return true
	}

	let count = 0

	for (let len = 1;len <= s.length; len++ ){
		for (let i = 0; i+len <= s.length; i++){ // 长度为len的字符串遍历
			let substr = s.substr(i, len)
			if (huiwen(substr)) {
				count++
			} 
		}
	}

	return count
};