const env = Object.assign(process.env,
	require('./env'),
	require('./config'));

const http = require('http');
const chr = require('./character/redirect');
const pmc = require('./character/premade');
const chl = require('./character/load');
const chs = require('./character/save');
const mvu = require('./movie/upload');
const asu = require('./asset/upload');
const sts = require('./starter/save');
const stl = require('./static/load');
const stp = require('./static/page');
const sto = require('./static/pageStudio');
const sas = require('./static/pageAjaxShare');
const sti = require('./static/pagelvmold');
const sco = require('./static/pageOld');
const stt = require('./static/pageTutorial');
const stc = require('./static/pagecc');
const scc = require('./static/pageccbro');
const slv = require('./static/pagelvp');
const asl = require('./asset/load');
const asL = require('./asset/list');
const ast = require('./asset/thmb');
const mvl = require('./movie/load');
const mvL = require('./movie/list');
const mvm = require('./movie/meta');
const mvs = require('./movie/save');
const mvt = require('./movie/thmb');
const thL = require('./theme/list');
const thl = require('./theme/load');
const tsv = require('./tts/voices');
const tsl = require('./tts/load');
const evt = require('./events');
const url = require('url');

const functions = [
	mvL,
	pmc,
	asl,
	evt,
	chl,
	chr,
	thl,
	thL,
	chs,
	asL,
	tsl,
	ast,
	mvm,
	mvl,
	mvs,
	mvt,
	tsv,
	asu,
	mvu,
	stp,
	sto,
	stc,
	scc,
	slv,
	stl,
	sti,
	sco,
	sas,
	stt,
	sts,
];

module.exports = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	//if (!parsedUrl.path.endsWith('/')) parsedUrl.path += '/';
	const found = functions.find(f => f(req, res, parsedUrl));
	if (!found) { res.statusCode = 404; res.end(); }
}).listen(env.PORT || env.SERVER_PORT, console.log);
