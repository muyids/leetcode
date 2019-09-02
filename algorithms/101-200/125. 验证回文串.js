/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {

    function isChar(c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= "Z")
    }

    function isNum(c) {
        return c >= '0' && c <= '9'
    }

    for (let i = 0, j = s.length - 1; i < j;) {
        while (!isChar(s[i]) && !isNum(s[i]) && i < j) {
            i++
        }

        while (!isChar(s[j]) && !isNum(s[j]) && i < j) {
            j--
        }

        let diff = Math.abs(s.charCodeAt(i) - s.charCodeAt(j))

        if ((isChar(s[i]) && diff !== 32 && diff !== 0) || (isNum(s[i]) && diff !== 0)) {
            return false
        }
        i++;
        j--;
    }
    return true
};
