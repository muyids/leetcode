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

function syncTitle(dir_path) {
    let rows = fs.readdirSync(dir_path, {
        withFileTypes: true
    })
    for (let row of rows) {
        if (!row.isDirectory()) {
            if (row.name.substr(row.name.length - 3) != '.md') continue;
            let id = ''
            let r = 0;
            while (row.name[r++] != '.') id += row.name[r - 1]
            let newName = `${id}.${mp[id].stat.question__title_slug}.md`
            fs.renameSync(path.join(dir_path, row.name), path.join(dir_path, newName))
            continue
        }
        syncTitle(path.join(dir_path, row.name))
    }
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
        readLine.on('line', function (line) {
            writeStream.write(line + os.EOL);
        })
        readLine.on('close', function () {
            resolve()
        })
        readLine.on('error', function (err) {
            reject(err)
        })
    })
}

let getSolveTitle = function (line) {
    let num = ''
    if (line.indexOf('lc') > -1) {
        let l = line.indexOf('lc') + 2,
            r = l
        while (line[r] != '.') r++
        num = line.substr(l, r - l)
    }

    console.log(num)
    let newLine = `### [${num}.${mp[num].stat.question__title}]()`
    console.log(newLine)
    // ### 
    // lc39.组合总和
}

function delFile(dir_path) {
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
        delFile(path.join(dir_path, row.name))
    }
}

async function syncSolve(dir_path) {
    let rows = fs.readdirSync(dir_path, {
        withFileTypes: true
    })
    for (let row of rows) {
        if (!row.isDirectory()) {
            console.log(row)
            await readWriteFileByLineWithProcess(path.join(dir_path, row.name), path.join(dir_path, row.name + '.copy'))
            return
        }
        syncSolve(path.join(dir_path, row.name))
    }
}


function main() {
    // 更新algorithms目录
    syncTitle('./algorithms')
    // 更新chapter中【力扣题解引用】
    // syncSolve('./chapter')
    // delFile('./chapter')
    // getSolveTitle('lc216. 组合总和 III')
}

main()

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