'use strict'

/**同步chapter目录下的力扣题解 */

const path = require('path')
const os = require('os')
const fs = require('fs')
const rl = require('readline')
let TMP_DIR = './tmp'
let PROBLEMS_FILE = path.join(TMP_DIR, `problem.json`)
let data = fs.readFileSync(PROBLEMS_FILE).toString()
let questions = JSON.parse(data)
let mp = {}
for (let p of questions.stat_status_pairs) {
    mp[p.stat.frontend_question_id] = p
}

function getTitleByNum(num) {
    let scope = (parseInt((num - 1) / 100) * 100 + 1) + '-' + (100 * (parseInt((num - 1) / 100) + 1))
    let githubRouter = `https://github.com/muyids/leetcode/blob/master/algorithms/${scope}/${num}.${mp[num].stat.question__title_slug}.md`
    let level = levels[mp[num].difficulty.level]
    let newLine = `- [LeetCode ${num}. ${mp[num].stat.question__title} (${level})](${githubRouter})`
    console.log(newLine)
    return newLine
}



/**
 * 按行读写，中间包涵对读取的行内容的处理
 * @param {string} readName 
 * @param {string} writeName 
 * @param {Function} callback 
 */
let readWriteFileByLineWithProcess = function (readName, writeName) {
    return new Promise(function (resolve, reject) {
        let readStream = fs.createReadStream(readName);
        let writeStream = fs.createWriteStream(writeName);
        let readLine = rl.createInterface({
            input: readStream
        })
        let content = ''
        readLine.on('line', function (line) {
            content += getSolveTitle(line)
        })
        readLine.on('close', function () {
            writeStream.write(content + os.EOL);
            resolve()
        })
        readLine.on('error', function (err) {
            reject(err)
        })
    })
}

const levels = {
    1: 'easy',
    2: 'medium',
    3: 'hard'
}

let getSolveTitle = function (line) {
    if (line.indexOf('lc') == -1 && line.indexOf('力扣') == -1 && line.indexOf('LeetCode') == -1) return line
    let num = ''
    if (line.indexOf('lc') > -1) {
        let l = line.indexOf('lc') + 2,
            r = l
        while (line[r] != '.') r++
        num = line.substr(l, r - l).trim()
    } else if (line.indexOf('力扣') > -1) {
        let l = line.indexOf('力扣') + 2,
            r = l
        while (line[r] != '.') r++
        num = line.substr(l, r - l).trim()
    } else if (line.indexOf('LeetCode') > -1) {
        let l = line.indexOf('LeetCode') + 8,
            r = l
        while (line[r] != '.') r++
        num = line.substr(l, r - l).trim()
    }
    return getTitleByNum(num)
}

async function delFile(dir_path) {
    let rows = fs.readdirSync(dir_path, {
        withFileTypes: true
    })
    for (let row of rows) {
        if (!row.isDirectory()) {
            if (row.name.indexOf('.copy') == -1) {
                fs.unlinkSync(path.join(dir_path, row.name))
            }
            continue
        }
        await delFile(path.join(dir_path, row.name))
    }
}

async function cleanFiles(dir_path) {
    let rows = fs.readdirSync(dir_path, {
        withFileTypes: true
    })
    for (let row of rows) {
        if (!row.isDirectory()) {
            if (row.name.indexOf('.copy') > -1) {
                fs.unlinkSync(path.join(dir_path, row.name))
            }
            continue
        }
        await cleanFiles(path.join(dir_path, row.name))
    }
}

async function mvFile(dir_path) {
    let rows = fs.readdirSync(dir_path, {
        withFileTypes: true
    })
    for (let row of rows) {
        if (!row.isDirectory()) {
            if (row.name.indexOf('.copy') > -1) {
                console.log(path.join(dir_path, row.name.substr(0, row.name.length - 5)))
                fs.renameSync(path.join(dir_path, row.name), path.join(dir_path, row.name.substr(0, row.name.length - 5)))
            }
            continue
        }
        await mvFile(path.join(dir_path, row.name))
    }
}

// 解决每一行中力扣题解引用
async function syncSolve(dir_path) {
    let rows = fs.readdirSync(dir_path, {
        withFileTypes: true
    })
    for (let row of rows) {
        if (!row.isDirectory()) {
            console.log(row)
            await readWriteFileByLineWithProcess(path.join(dir_path, row.name), path.join(dir_path, row.name + '.copy'))
            continue
        }
        await syncSolve(path.join(dir_path, row.name))
    }
}

async function main() {
    try {
        // 删除.copy文件
        // await cleanFiles('./chapter')
        // 更新algorithms目录
        // await syncTitle('./algorithms')
        // 更新chapter中【力扣题解引用】
        // await syncSolve('./chapter')

        // await delFile('./chapter')

        // await mvFile('./chapter')
    } catch (e) {
        console.log(e)
    }
}

getTitleByNum(process.argv[3])

//  {
//      "stat": {
//          "question_id": 1000044,
//          "question__title": "Missing Two LCCI",
//          "question__title_slug": "missing-two-lcci",
//          "question__hide": false,
//          "total_acs": 336,
//          "total_submitted": 572,
//          "total_column_articles": 16,
//          "frontend_question_id": "面试题 17.19",
//          "is_new_question": false
//      },
//      "status": null,
//      "difficulty": {
//          "level": 3
//      },
//      "paid_only": false,
//      "is_favor": false,
//      "frequency": 0,
//      "progress": 0
//  },