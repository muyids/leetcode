/**
 * OJ网站获取输入模板
 */
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = []
rl.on('line', (line) => {
    lines.push(line)
}).on('close', () => {
    main(lines)
});

function main(lines) {

}
