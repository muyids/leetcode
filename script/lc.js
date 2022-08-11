#!/usr/local/bin/node

/**
 * 力扣题解
 *
 * - 文件链接自动生成
 * - 使用：lc 892
 * @constructor
 */
const os = require("os");
const path = require("path");
const process = require("process");
const fs = require("fs");

function LeetSolver() {
  this.home = getHome();
  this.docHome = getDOCHome();
  this.problems = {};
}

LeetSolver.PROBLEM_STATUS = {
  AC: "ac",
  NOT_AC: "notac",
};

LeetSolver.LEVEL = {
  1: "easy",
  2: "medium",
  3: "hard",
};

function getHome() {
  return process.env.LEETCODE_HOME || path.join(os.homedir(), ".leetcode");
}

function getDOCHome() {
  return process.env.LEETCODE_DOC_HOME || path.join(os.homedir(), ".leetcode");
}

function __getKey__(s) {
  s = s.toString();
  return s.replace(/\s*/g, "").toLowerCase();
}

LeetSolver.prototype.parseProblem = function () {
  const problemFile = path.join(this.home, "problem.json");
  if (!fs.existsSync(problemFile)) {
    throw new Error(`文件(${problemFile})不存在！`);
  }
  const data = fs.readFileSync(problemFile);
  const all = JSON.parse(data);
  for (const item of all.stat_status_pairs) {
    this.problems[__getKey__(item.stat.frontend_question_id)] = item;
    this.problems[__getKey__(item.stat.question__title)] = item;
  }
};

function getDir(num) {
  return (
    parseInt((num - 1) / 100) * 100 +
    1 +
    "-" +
    100 * (parseInt((num - 1) / 100) + 1)
  );
}

/**
 * 生成题解模板文件
 * @param num 题号/题目名称
 */
LeetSolver.prototype.createFile = async function (num) {
  if (!num) {
    throw new Error("请输入题号或题目！");
  }
  const problem = this.problems[__getKey__(num)];
  if (!problem) {
    throw new Error("题目未找到，运行`lc sync`同步本地题库？");
  }
  const dirName = getDir(problem.stat.frontend_question_id);
  const fileName = `${problem.stat.frontend_question_id}.${problem.stat.question__title_slug}.md`;
  const filePath = path.join(path.join(this.docHome, dirName), fileName);

  // 创建模板文件
  let content = fs
    .readFileSync(
      path.join(process.env.LEETCODE_HOME || __dirname, "template.md")
    )
    .toString();
  const realLink = `[LeetCode ${problem.stat.frontend_question_id}. ${
    problem.stat.question__title
  } (${
    LeetSolver.LEVEL[problem.difficulty.level]
  })](https://leetcode.cn/problems/${problem.stat.question__title_slug}/)`;
  content = content.replace("$$PROBLEM_LINK$$", realLink);
  if (fs.existsSync(filePath)) {
    console.error("文件已存在！", filePath);
  } else {
    fs.writeFileSync(filePath, content);
    console.log("新建文件", filePath, "\n");
  }
  console.log(content);
};

/**
 * 打印题目引用链接
 * @param num
 */
LeetSolver.prototype.printLink = function (num) {
  const problem = this.problems[__getKey__(num)];
  const id = problem.stat.frontend_question_id;
  const link = `- [LeetCode ${id}. ${problem.stat.question__title} (${
    LeetSolver.LEVEL[problem.difficulty.level]
  })](./problems/${getDir(id)}/${id}.${problem.stat.question__title_slug}.md)`;
  console.log(link);
};

/**
 * 随机题目
 */
LeetSolver.prototype.randomNotAc = async function (num) {};

const lc = new LeetSolver();
lc.parseProblem();
if (process.argv.length === 3) {
  lc.printLink(process.argv[2]);
} else if (process.argv.length === 4) {
  if (process.argv[2] === "create") {
    lc.createFile(process.argv[3]).then();
  }
}
