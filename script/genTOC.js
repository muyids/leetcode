const fs = require('fs')
const os = require('os')
const path = require('path')
const chrome = require('chrome-cookies-secure')
const {
	exec
} = require('child_process');

let problemsMap = {}

let TMP_DIR = './tmp'
let PROBLEMS_FILE = path.join(TMP_DIR, `problem.json`)
let TAGS_FILE = path.join(TMP_DIR, `tag.json`)

const LEVEL = ['', '简单', '中等', '困难']

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path) {
	return new Promise((resolve, reject) => {
		fs.stat(path, (err, stats) => {
			if (err) {
				reject(false);
			} else {
				resolve(stats);
			}
		})
	})
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir) {
	return new Promise((resolve, reject) => {
		fs.mkdir(dir, err => {
			if (err) {
				reject(false);
			} else {
				resolve(true);
			}
		})
	})
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir) {
	let isExists = await getStat(dir);
	// 如果该路径且不是文件，返回true
	if (isExists && isExists.isDirectory()) {
		return true;
	} else if (isExists) { //如果该路径存在但是文件，返回false
		return false;
	}
	// 如果该路径不存在
	let tempDir = path.parse(dir).dir; //拿到上级路径
	// 递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
	let status = await dirExists(tempDir);
	let mkdirStatus;
	if (status) {
		mkdirStatus = await mkdir(dir);
	}
	return mkdirStatus;
}

// 同步问题集
function syncProblemsStat(profile) {
	return new Promise(function (resolve, reject) {
		chrome.getCookies('https://leetcode-cn.com/problemset/all/', '', function (err, cookies) {
			let pairs = []
			for (let [k, v] of Object.entries(cookies)) {
				pairs.push(k + '=' + v)
			}
			let cookiesPairs = pairs.join('; ')
			let cmd = `curl https://leetcode-cn.com/api/problems/all/ --cookie "${cookiesPairs}" > ${PROBLEMS_FILE} \
        && curl https://leetcode-cn.com/problems/api/tags/ --cookie "${cookiesPairs}" > ${TAGS_FILE}`
			exec(cmd, (err, stdout, stderr) => {
				if (err) reject(err)
				resolve()
			});
		}, profile || 'Default');
	})
}

function drawHot(count) {
	return [1000, 30000, 100000, 300000, 700000].reduce((pre, l) => pre += count > l ? "★" : "", "") // ☆
}

function genTocByTag() {
	let tags = fs.readFileSync(TAGS_FILE)
	tags = JSON.parse(tags.toString())
	tags = tags.topics
	let TOC = "## 🔗 LeetCode标签分类(LeetCode Tags)\n\n"
	for (let tag of tags) {
		let subToc = `### [${tag.translatedName || tag.name}](https://leetcode-cn.com/problemset/all/?topicSlugs=${tag.slug})\n\n`
		subToc += `| 题号 | 题名 | 题解 | 通过率 | 难度 | AC | 热度 | \n|:---:| :-----: |:--:|:--:|:--:|:--:|:--:|\n`
		for (let id of tag.questions) {
			if (problemsMap.hasOwnProperty(id)) {
				subToc += problemsMap[id]
			}
		}
		TOC += subToc + '\n------\n'
	}
	return TOC
}

function genHotByTag() {

	let tags = fs.readFileSync(TAGS_FILE)
	tags = JSON.parse(tags.toString())
	tags = tags.topics
	let TOC = "## 🔥Hot题目\n\n"

	for (let tag of tags) {
		let subToc = `### [${tag.translatedName || tag.name}](https://leetcode-cn.com/problemset/all/?topicSlugs=${tag.slug})\n\n`
		subToc += `| 题号 | 题名 | 题解 | 通过率 | 难度 | AC | 热度 | \n|:---:| :-----: |:--:|:--:|:--:|:--:|:--:|\n`
		let count = 0;
		for (let id of tag.questions) {
			if (count >= 5) continue

			if (problemsMap.hasOwnProperty(id)) {
				if (problemsMap[id].indexOf('★★') == -1) continue
				subToc += problemsMap[id]
				count++
			}
		}
		TOC += subToc + '\n------\n'
	}
	return TOC
}

function genProcess() {
	let problems = fs.readFileSync(PROBLEMS_FILE)
	problems = JSON.parse(problems.toString())

	let str = "\n## 🔐 Problems & Solutions\n\n"
	str += `完成进度（[${problems.num_solved}](./TOC-By-ID.md)🔑/ [${problems.num_total}](https://leetcode-cn.com/problemset/all/)🔒) `
	return str
}

function genTocIndex() {
	let str = "\n\n\n- 🔗 [标签查找](./TOC-By-Tag.md)\n\n"
	str += "- 🔗 [题号查找](./TOC-By-ID.md)\n\n"
	return str
}

/**
 * 生成目录
 * 目录内容输出位置：文档中字符串标记`&nbsp;`之后
 */
function genTocById() {
	let files = fs.readdirSync("./algorithms")
	let tocById = "## 🔗LeetCode题号(LeetCode Pids)\n\n"
	// 获取题目信息
	let problems = fs.readFileSync(PROBLEMS_FILE)
	problems = JSON.parse(problems.toString())
	let pairs = problems.stat_status_pairs

	// 题号排序
	files.sort((a, b) => {
		a = a.split('-').map(v => v.trim())
		b = b.split('-').map(v => v.trim())
		return +a[0] - b[0]
	})
	for (let nums of files) {
		if (nums.indexOf('-') === -1) continue;
		let subToc = `| 第${nums}题 | 题名 | 题解 | 通过率 | 难度 | AC | 热度 | \n|:---:| :-----: |:--:|:--:|:--:|:--:|:--:|\n`
		let problems = fs.readdirSync("./algorithms/" + nums)
		problems.sort(function (a, b) {
			a = a.split('.').map(v => v.trim())
			b = b.split('.').map(v => v.trim())
			return +a[0] - b[0]
		})

		for (let problem of problems) {
			const {
				id,
				line
			} = genLine(problem, pairs, nums)
			subToc += line
			problemsMap[id] = line
		}
		tocById += subToc + '\n\n'
	}
	return tocById
}

function genLine(problem, pairs, nums) {
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
	return {
		id,
		line
	}
}

(async function () {
	if (os.platform() == 'win32') {
		return
	}

	await dirExists(TMP_DIR)
	await syncProblemsStat('Default')
	fs.writeFileSync('./TOC-By-ID.md', genTocById())
	fs.writeFileSync('./TOC-By-Tag.md', genTocByTag())

	let TOC = "\n" + genProcess() + "\n" + genTocIndex() + "\n"
	let data = fs.readFileSync("./README.md");
	data = data.toString()
	data = data.substr(0, data.indexOf('&nbsp;') + 7) + TOC
	fs.writeFileSync("./README.md", data)

})()
