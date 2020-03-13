'use strict'

/**同步chapter目录下的力扣题解 */

const path = require('path')
const fs = require('fs')
let TMP_DIR = './tmp'
let PROBLEMS_FILE = path.join(TMP_DIR, `problem.json`)


function main() {

    let data = fs.readFileSync(PROBLEMS_FILE).toString()

    let questions = JSON.stringify(data)

    console.log(questions)
}

main()