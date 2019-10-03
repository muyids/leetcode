let fs = require('fs')

let problemsMap = {}

// 同步问题集
function syncProblemsStat(cb) {
    const chrome = require('chrome-cookies-secure');
    const {exec} = require('child_process');
    chrome.getCookies('https://leetcode-cn.com/problemset/all/', '', function (err, cookies) {
        let pairs = []
        for (let [k, v] of Object.entries(cookies)) {
            pairs.push(k + '=' + v)
        }
        let cookiesPairs = pairs.join('; ')
        let cmd = `curl https://leetcode-cn.com/api/problems/all/ --cookie "${cookiesPairs}" > problem.json \
        && curl https://leetcode-cn.com/problems/api/tags/ --cookie "${cookiesPairs}" > tags.json`
        exec(cmd, (err, stdout, stderr) => {
            cb(err, stdout, stderr)
        });
    }, "Profile 1");
}

function drawHot(count) {
    return [1000, 30000, 100000, 300000, 700000].reduce((pre, l) => pre += count > l ? "★" : "", "") // ☆
}

function genTocByTag() {
    let tags = fs.readFileSync("./tags.json")
    tags = JSON.parse(tags.toString())
    tags = tags.topics
    let TOC = "## 按分类\n\n"
    for (let tag of tags) {
        let subToc = `[${tag.translatedName || tag.name}](https://leetcode-cn.com/problemset/all/?topicSlugs=${tag.slug})\n`
        subToc += `| 题号 | 题名 | 题解 | 通过率 | 难度 | AC | 热度 | \n|:---:| :-----: |:--:|:--:|:--:|:--:|:--:|\n`
        for (let id of tag.questions) {
            if (problemsMap.hasOwnProperty(id)) {
                subToc += problemsMap[id]
            }
        }
        TOC += subToc + '\n\n'
    }
    return TOC
}

/**
 * 生成目录
 * 目录内容输出位置：文档中字符串标记`&nbsp;`之后
 */
function genTocById() {
    let files = fs.readdirSync("./algorithms")
    let LEVEL = ['', '简单', '中等', '困难']
    let tocById = "### 按题号\n\n"
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
        let subToc = `| 第${nums}题 | 题名 | 题解 | 通过率 | 难度 | AC | 热度 | \n|:---:| :-----: |:--:|:--:|:--:|:--:|:--:|\n`
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
                return item.stat.frontend_question_id == title[0]
            })
            let id = title[0]
            let solutions = 0
            let passRate = "no"
            let hot = "★"
            let level = 1
            let status = 'NO'
            if (stat) {
                level = stat.difficulty.level
                title[0] = `[${title[0]}](https://leetcode-cn.com/problems/${stat.stat.question__title_slug}/)`
                if (stat.status == 'ac') status = 'YES'
                solutions = `[${stat.stat.total_column_articles}](https://leetcode-cn.com/problems/${stat.stat.question__title_slug}/solution/)`
                passRate = (stat.stat.total_acs / stat.stat.total_submitted * 100).toFixed(1) + "%"
                hot = drawHot(stat.stat.total_submitted)
            }
            let line = `| ${title[0]} | [${title[1]}](algorithms/${nums}/${encodeURI(problem)}) | ${solutions} | ${passRate} | ${LEVEL[level]} | ${status}| ${hot} |\n`
            subToc += line
            problemsMap[id] = line
        }
        tocById += subToc + '\n\n'
    }
    return tocById
}

function save(TOC) {
    let data = fs.readFileSync("./README.md");
    data = data.substr(0, data.indexOf('&nbsp;') + 7) + TOC
    fs.writeFileSync("./README.md", data)
}

(function () {
    syncProblemsStat((err, stdout, stderr) => {
        if (err) {
            console.log(err)
        }
        console.log(stdout, stderr)
        let idToc = genTocById()
        let tagToc = genTocByTag()
        let TOC = "\n" + tagToc + "\n\n" + idToc + "\n\n"
        let data = fs.readFileSync("./README.md");
        data = data.toString()
        data = data.substr(0, data.indexOf('&nbsp;') + 7) + TOC
        fs.writeFileSync("./README.md", data)
    })
})()