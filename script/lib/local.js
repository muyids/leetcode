
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