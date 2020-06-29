'use strict';

/**同步chapter目录下的力扣题解 */

const path = require('path')
const fs = require('fs')
let TMP_DIR = './tmp'
let PROBLEMS_FILE = path.join(TMP_DIR, `problem.json`)
let data = fs.readFileSync(PROBLEMS_FILE).toString()
let questions = JSON.parse(data)
let mp = {}

for (let p of questions.stat_status_pairs) {
	mp[p.stat.frontend_question_id] = p
}

async function syncTitle(dir_path) {
	let rows = fs.readdirSync(dir_path, {
		withFileTypes: true
	})
	for (let row of rows) {
		if (!row.isDirectory()) {
			if (row.name.substr(row.name.length - 3) !== '.md') continue;
			let id = ''
			let r = 0;
			while (row.name[r++] !== '.') id += row.name[r - 1]
			let newName = `${id}.${mp[id].stat.question__title_slug}.md`
			fs.renameSync(path.join(dir_path, row.name), path.join(dir_path, newName))
			continue
		}
		await syncTitle(path.join(dir_path, row.name))
	}
}

syncTitle('./algorithms').then()