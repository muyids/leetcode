const fs = require('fs')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const gm = require('gm')
const path = require('path')

const DOT_PATH = './workspace/main.dot'
const TMP_DIR = './tmp'
let RESULT_GIF = './workspace/main.gif'
let VIDEO_FILE = './workspace/main.mp4'

// 图片拼接
function mosaic(bgPic, upPic) {
  return new Promise(function (resolve, reject) {
    gm()
      .in('-page', '+0+0')
      .in(bgPic)
      .in('-page', '+0+0')
      .in(upPic)
      .mosaic()
      .write(upPic, function (err) {
        if (err) reject(err)
        resolve()
      });
  })
}

function identity(path) {
  return new Promise(function (resolve, reject) {
    gm(path)
      .identify(function (err, data) {
        if (!err) resolve(data)
        reject(err)
      });
  })
}

function resize(path, width, height) {
  return new Promise(function (resolve, reject) {
    gm(path)
      .resize(width, height, '!')
      .write(path, function (err) {
        if (!err) resolve()
        reject(err)
      });
  })
}

function genPic(width, height, color, path) {
  return new Promise(function (resolve, reject) {
    gm(width, height, color)
      // .drawText(10, 50, "from dw")
      .write(path, function (err) {
        if (!err) resolve()
        reject(err)
      });
  })
}

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
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
        resolve(false);
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
  //如果该路径且不是文件，返回true
  if (isExists && isExists.isDirectory()) {
    return true;
  } else if (isExists) { //如果该路径存在但是文件，返回false
    return false;
  }
  //如果该路径不存在
  let tempDir = path.parse(dir).dir; //拿到上级路径
  //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  let status = await dirExists(tempDir);
  let mkdirStatus;
  if (status) {
    mkdirStatus = await mkdir(dir);
  }
  return mkdirStatus;
}

function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}

async function init() {
  delDir(TMP_DIR)
}

async function main() {
  await init()

  if (process.argv[2]) {
    let id = process.argv[2]
    if (!Number.isInteger(+id)) throw new Error('题号非法！')
    // 保存dot文件
    let cmd = `cp ${DOT_PATH} ./algorithms/dot/${id}.dot`
    await exec(cmd);
    RESULT_GIF = './algorithms/images/' + id + '.gif'
    VIDEO_FILE = './algorithms/videos/' + id + '.mp4'
  }
  let data = fs.readFileSync(DOT_PATH).toString()
  let dots = data.split('---')

  let maxWidth = 0,
    maxHeight = 0
  let pngs = []

  await dirExists(TMP_DIR)
  // 生成每一个步骤子图
  for (let i = 0; i < dots.length; i++) {
    let dotPath = path.join(TMP_DIR, `g${i}.dot`),
      pngPath = path.join(TMP_DIR, `g${i}.png`)
    fs.writeFileSync(dotPath, dots[i])
    let cmd = `dot -Tpng ${dotPath} -o ${pngPath}`
    await exec(cmd);
    pngs.push(pngPath)
    // 读图片大小，取最大的
    let data = await identity(pngPath)
    maxWidth = Math.max(maxWidth, data.size.width)
    maxHeight = Math.max(maxHeight, data.size.height)
  }

  // 生成一个背景图
  let bgPic = path.join(TMP_DIR, 'bg.png')
  await genPic(maxWidth, maxHeight, "#ffffff", bgPic)

  // 合成
  for (let i = 0; i < pngs.length; i++) {
    await mosaic(bgPic, pngs[i])
  }

  let GM = gm()
  for (let i = 0; i < pngs.length; i++) {
    GM = GM.in('-delay', 100).in(pngs[i])
  }
  await genVideo(pngs)
  GM.resize(maxWidth, maxHeight).write(RESULT_GIF, function (err) {
    if (err) console.log(err)
    console.log(`generate gif file: ${RESULT_GIF}(width: ${maxWidth}, height: ${maxHeight})`, )
  });
}

async function genVideo(pngs) {
  // r: 帧率；60帧率表示1秒钟60张图；1/2帧率表示一秒钟半张图，也就是两秒钟一张图；
  let cmd = `ffmpeg -r 1/2 -y -f image2 -i tmp/g%d.png ${VIDEO_FILE}`
  await exec(cmd);
  console.log(`generate video file: ${VIDEO_FILE}`)
}

main().then().catch(e => {
  if (e) console.log(e)
}).finally(() => {})
