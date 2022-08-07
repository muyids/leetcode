/**
 * OJ网站获取输入模板
 */

 var a = 1;
 function dfs(arr){
     for (i=0;i<arr.length;i++){
         if(arr[i] instanceof Array){
             a++;
             arr = arr[i];
             dfs(arr);
         }
     }
     return a;
 }

var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    main(line)
}).on('close', () => {
    
});

function main(s) {

   res = dfs(JSON.parse(s))
   console.log(res)
}




