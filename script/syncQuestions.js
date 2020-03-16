'use strict'

const path = require('path')
const os = require('os')
const fs = require('fs')

let content = ''

let generateQuestionsTOC = function (dir_path) {
    let rows = fs.readdirSync(dir_path, {
        withFileTypes: true
    })
    rows.sort((rowrow1, rowrow2) => {
        let row1 = rowrow1.name
        let row2 = rowrow2.name
        let l1 = 0,
            l2 = 0
        while (l1 < row1.length && (row1[l1] != '.' && row1[l1] != '-')) l1++
        while (l2 < row2.length && (row2[l2] != '.' && row2[l2] != '-')) l2++
        let id1 = +row1.substr(0, l1)
        let id2 = +row2.substr(0, l2)
        return id1 - id2
    })
    for (let row of rows) {
        if (!row.isDirectory()) {
            if (row.name.indexOf('.md') == -1) continue
            row.name = row.name.substr(0, row.name.length - 3)
            content += `  * [${row.name}](https://github.com/muyids/leetcode/blob/master/${dir_path}/${row.name + '.md'})` + '\n'
            continue
        }
        content += `* [${row.name}](./Questions.md)` + '\n'
        generateQuestionsTOC(path.join(dir_path, row.name))
    }
}

generateQuestionsTOC('./algorithms')

fs.writeFileSync('Questions.md', content)