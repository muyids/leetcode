// 自动生成目录
(function f() {
    let fs = require('fs')
    let TOC = '\n'
    let data = fs.readFileSync("./README.md");
    let files = fs.readdirSync("./algorithms")

    let LEVEL = ['', '简单', '中等', '困难']

    // 获取题目信息
    let problems = fs.readFileSync("./problem.json")
    problems = JSON.parse(problems.toString())
    let pairs = problems.stat_status_pairs

    // 题号排序
    files.sort((a, b) => {
        a = a.split('-').map(v => v.trim())
        b = b.split('-').map(v => v.trim())
        return +a[0] - b[0]
    })
    for (let nums of files) {
        if (nums.indexOf('-') == -1) continue;
        let subToc = `| 第${nums}题 | 题名 | 难度 | \n|:---:| :-----: |:--:|\n`
        let problems = fs.readdirSync("./algorithms/" + nums)
        problems.sort(function (a, b) {
            a = a.split('.').map(v => v.trim())
            b = b.split('.').map(v => v.trim())
            return +a[0] - b[0]
        })

        for (let problem of problems) {
            let title = problem.split('.').map(v => v.trim())
            let str = title[1].match(/\[(\S*)\]/)
            if (str) {
                title[1] = title[1].substr(title[1].indexOf(str[0]) + str[0].length)
                title[1] = title[1].replace(/^\s*/, "");
            }

            let stat = pairs.find((item) => {
                return item.stat.question_id == title[0]
            })
            let level = 1
            if (stat) {
                level = stat.difficulty.level
                title[0] = `[${title[0]}](https://leetcode-cn.com/problems/${stat.stat.question__title_slug}/)`
            }
            subToc += `| ${title[0]} | [${title[1]}](algorithms/${nums}/${encodeURI(problem)}) | ${LEVEL[level]} |\n`
        }
        TOC += subToc + '\n\n'
    }
    data = data.toString()
    data = data.substr(0, data.indexOf('&nbsp;') + 7) + TOC
    fs.writeFileSync("./README.md", data)
})()