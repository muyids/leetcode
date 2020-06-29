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

getTitleByNum(process.argv[3])
