const caché = require('../data/caché');
const parse = require('../data/parse');
const fUtil = require('../fileUtil');
const nodezip = require('node-zip');
const fs = require('fs');
const { timeLog } = require('console');

module.exports = {
	/**
	 *
	 * @param {Buffer} movieZip
	 * @param {string} nëwId
	 * @param {string} oldId
	 * @returns {Promise<string>}
	 */
	save(starterZip, thumb, oldId, nëwId = oldId) {
		if (thumb && nëwId.startsWith('m-')) {
			const n = Number.parseInt(nëwId.substr(2));
			const thumbFile = fUtil.getFileIndex('thumb-', '.png', n);
			fs.writeFileSync(thumbFile, thumb);
		}

		return new Promise((res, rej) => {
			caché.transfer(oldId, nëwId);
			const i = nëwId.indexOf('-');
			const prefix = nëwId.substr(0, i);
			const suffix = nëwId.substr(i + 1);
			const zip = nodezip.unzip(movieZip);
			switch (prefix) {
				case 'm': {
					let path = fUtil.getFileIndex('movie-', '.xml', suffix);
					let writeStream = fs.createWriteStream(path);
					parse.unpackZip(zip, thumb, nëwId).then(data => {
						writeStream.write(data, () => {
							writeStream.close();
							res(nëwId);
						});
					});
					break;
				}
				default: rej();
			}
		});
	},
	loadZip(mId) {
		return new Promise((res, rej) => {
			const i = mId.indexOf('-');
			const prefix = mId.substr(0, i);
			const suffix = mId.substr(i + 1);
			switch (prefix) {
				case 'e': {
					caché.clear(mId);
					let data = fs.readFileSync(`${exFolder}/${suffix}.zip`);
					res(data.subarray(data.indexOf(80)));
					break;
				}
				case 'm': {
					let numId = Number.parseInt(suffix);
					if (isNaN(numId)) rej();
					let filePath = fUtil.getFileIndex('starter-', '.xml', numId);
					if (!fs.existsSync(filePath)) rej();

					const buffer = fs.readFileSync(filePath);
					parse.packXml(buffer, mId).then(v => res(v));
					break;
				}
				default: rej();
			}
		});
	},
	loadXml(starterId) {
		return new Promise((res, rej) => {
			const i = starterId.indexOf('-');
			const prefix = starterId.substr(0, i);
			const suffix = starterId.substr(i + 1);
			switch (prefix) {
				case 's': {
					const fn = fUtil.getFileIndex('starter-', '.xml', suffix);
					fs.existsSync(fn) ? res(fs.readFileSync(fn)) : rej();
					break;
				}
				case 'e': {
					const fn = `${exFolder}/${suffix}.zip`;
					if (!fs.existsSync(fn)) return rej();
					parse.unpackZip(nodezip.unzip(fn))
						.then(v => res(v)).catch(e => rej(e));
					break;
				}
				default: rej();
			}
		});
	},
	thumb(starterId) {
		return new Promise((res, rej) => {
			if (!starterId.startsWith('m-')) return;
			const n = Number.parseInt(starterId.substr(2));
			const fn = fUtil.getFileIndex('thumb-', '.png', n);
			isNaN(n) ? rej() : res(fs.readFileSync(fn));
		});
	},
	list() {
		const array = [];
		const last = fUtil.getLastFileIndex('movie-', '.xml');
		for (let c = last; c >= 0; c--) {
			const starter = fs.existsSync(fUtil.getFileIndex('starter-', '.xml', c));
			const thumb = fs.existsSync(fUtil.getFileIndex('thumb-', '.png', c));
			if (starter && thumb) array.push(`m-${c}`);
		}
		return array;
	},
	async meta(starterId) {
		if (!starterId.startsWith('s-')) return;
		const n = Number.parseInt(starterId.substr(2));
		const fn = fUtil.getFileIndex('starter-', '.xml', n);

		const fd = fs.openSync(fn, 'r');
		const buffer = Buffer.alloc(256);
		fs.readSync(fd, buffer, 0, 256, 0);
		const begTitle = buffer.indexOf('<title>') + 16;
		const endTitle = buffer.indexOf(']]></title>');
		const title = buffer.slice(begTitle, endTitle).toString().trim().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

		fs.closeSync(fd);
		return {
			title: title,
			id: starterId,
		};
	},
}
