// this file is for the static folder in wrapper offline 1.2.3.
const sessions = require('../data/sessions');
const fUtil = require('../fileUtil');
const stuff = require('./info');

function toAttrString(table) {
	return typeof (table) == 'object' ? Object.keys(table).filter(key => table[key] !== null).map(key =>
		`${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`).join('&') : table.replace(/"/g, "\\\"");
}
function toParamString(table) {
	return Object.keys(table).map(key =>
		`<param name="${key}" value="${toAttrString(table[key])}">`
	).join(' ');
}
function toObjectString(attrs, params, navbar) {
	return `<object id="obj" ${Object.keys(attrs).map(key =>
		`${key}="${attrs[key].replace(/"/g, "\\\"")}"`
	).join(' ')}>${toParamString(params)}</object>`;
}

module.exports = function (req, res, url) {
	if (req.method != 'GET') return;
	const query = url.query;

	var attrs, params, title;
	switch (url.pathname) {
		case '/charactercreator/': {
			title = 'The Character Creator from Vyond - Make a character online';
			attrs = {	
				data: process.env.SWF_URL + '/cc_browser.swf', // data: 'cc.swf',
				type: 'application/x-shockwave-flash', id: 'char_creator', width: '960', height: '1200',
			};
			params = {
				flashvars: {
					'apiserver': '/', 'isEmbed': '0', 'ctc': 'go', 'tlang': 'en_US', 'storePath':  process.env.STORE_URL + '/<store>',
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>', 'appCode': 'go', 'siteId': 'school', 'st': '', 
					'userId': '0DyHqK6Yj9dM', 'ut': 23, 'uisa': 0, 'themeId': 'family',
					'u_info_school': 'OjI6c2xoVVM3MWJIX05DMnA4cmRBQ2dFd3JvNE5xc2JEc2o4UFB2X1dVd2Eya2RPQisxVTl4d3ZHZHJPYnI4QURFNENWMjNkYm12WFdlUGxLT0g0OG4rekF5ajZhWGRGVTlocmJ4S1JhSWhCVXJlTF9BbXdyQUp3PQ==',

				},
				allowScriptAccess: 'always',
				movie: process.env.SWF_URL + '/cc.swf', // 'http://localhost/cc.swf'
			};
			break;
		}
		default:
			return;
	}
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	Object.assign(params.flashvars, query);
	res.end(
	`<html><head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<link rel="dns-prefetch" href="https://josephcrosmanplays532.github.io">
<script>document.title='${title}'</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="The Character Creator from Vyond - Create a character online with Vyond.">
<meta property="og:site_name" content="Vyond">
<meta property="fb:app_id" content="177116303202">
<meta name="google-site-verification" content="K_niiTfCVi72gwvxK00O4NjsVybMutMUnc-ZnN6HUuA">
<link rel="canonical" href="https://localhost:4343/pages/html/list.html">
<link href="/pages/css/global.css" rel="stylesheet" type="text/css">
<link href="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/css/cc.css.gz.css" rel="stylesheet" type="text/css">
<!--[if lt IE 9]>
<style text="text/css">
.top-nav.collapse {height: auto;overflow: visible;}
</style>
<![endif]-->
<script type="text/javascript" src="https://pi.pardot.com/pd.js"></script><script type="text/javascript" src="https://pi.pardot.com/pd.js"></script><script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script><script type="text/javascript" async="" src="https://sjs.bizographics.com/insight.min.js"></script><script type="text/javascript" async="" src="//www.googleadservices.com/pagead/conversion_async.js"></script><script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script><script src="https://connect.facebook.net/signals/config/784667875001149?v=2.9.15&amp;r=stable" async=""></script><script async="" src="//connect.facebook.net/en_US/fbevents.js"></script><script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-TXV7MD"></script><script type="text/javascript" async="" src="https://ga.vyond.com/ajax/cookie_policy"></script><script type="text/javascript" src="https://pi.pardot.com/pd.js"></script><script type="text/javascript" async="" src="//munchkin.marketo.net/155/munchkin.js"></script><script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script><script src="https://connect.facebook.net/signals/config/784667875001149?v=2.9.15&amp;r=stable" async=""></script><script async="" src="//connect.facebook.net/en_US/fbevents.js"></script><script type="text/javascript" async="" src="https://sjs.bizographics.com/insight.min.js"></script><script type="text/javascript" async="" src="//www.googleadservices.com/pagead/conversion_async.js"></script><script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-TXV7MD"></script><script type="text/javascript" async="" src="https://ga.vyond.com/ajax/cookie_policy"></script><script>
var srv_tz_os = -4, view_name = "go", user_cookie_name = "u_info";
var user_role = 11;
</script>
<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/common_combined.js.gz.js"></script>
<script type="text/javascript" src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/../po/goserver_js-en_US.json.gz.json"></script>
<script type="text/javascript">
var I18N_LANG = 'en_US';
var GT = new Gettext({'locale_data': json_locale_data});
</script>
<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/sessionChecker.js.gz.js"></script>
<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/amplitude/go_amp.js.gz.js"></script>
<!-- Vyond Cookie Consent -->
<script>(function(v,y,o,n){v[n]=v[n]||[];
var f=y.getElementsByTagName(o)[0],d=y.createElement(o);
d.type='text/javascript';d.async=true;d.src=
'https://ga.vyond.com/ajax/cookie_policy';
f.parentNode.insertBefore(d,f);
})(window,document,'script','_vyccq');</script>
<!-- End Vyond Cookie Consent -->
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXV7MD');
dataLayer.push({"userId":"0TBAAga2Mn6g"});
</script>
<!-- Google Tag Manager -->
<script>
</script>
<script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script><script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/956549168/?random=1577875084777&amp;cv=9&amp;fst=1577875084777&amp;num=1&amp;guid=ON&amp;resp=GooglemKTybQhCsO&amp;eid=376635470&amp;u_h=900&amp;u_w=1600&amp;u_ah=860&amp;u_aw=1600&amp;u_cd=24&amp;u_his=2&amp;u_tz=-360&amp;u_java=false&amp;u_nplug=4&amp;u_nmime=6&amp;gtm=2wgc61&amp;sendb=1&amp;ig=1&amp;frm=0&amp;url=https%3A%2F%2Ftvy4gv.000webhostapp.com%2FThe%2520Character%2520Creator%2520from%2520Vyond%2520-%2520Make%2520a%2520Character%2520Online%2520cw.html&amp;tiba=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;hn=www.googleadservices.com&amp;async=1&amp;rfmt=3&amp;fmt=4"></script><script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=109029277&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Ftvy4gv.000webhostapp.com%2FThe%2520Character%2520Creator%2520from%2520Vyond%2520-%2520Make%2520a%2520Character%2520Online%2520cw.html&amp;referrer="></script><script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script><script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script><script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/956549168/?random=1580006012218&amp;cv=9&amp;fst=1580006012218&amp;num=1&amp;guid=ON&amp;resp=GooglemKTybQhCsO&amp;u_h=900&amp;u_w=1600&amp;u_ah=860&amp;u_aw=1600&amp;u_cd=24&amp;u_his=2&amp;u_tz=-360&amp;u_java=false&amp;u_nplug=4&amp;u_nmime=6&amp;gtm=2wg1f1&amp;sendb=1&amp;ig=1&amp;frm=0&amp;url=https%3A%2F%2Fkennystuff001001001.000webhostapp.com%2Foldvyondstuff%2Fcharactercreator&amp;tiba=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;hn=www.googleadservices.com&amp;async=1&amp;rfmt=3&amp;fmt=4"></script><script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fkennystuff001001001.000webhostapp.com%2Foldvyondstuff%2Fcharactercreator&amp;referrer="></script><script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fkennystuff001001001.000webhostapp.com%2Foldvyondstuff%2Fcharactercreator&amp;referrer="></script></head>
<body class="en_US has-user" contenteditable="false">
<script type="text/javascript">
if (self !== top) {
            jQuery('body').hide();
    }
</script>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TXV7MD" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<script type="text/javascript">
        jQuery.extend(CCStandaloneBannerAdUI, {"actionshopSWF":"https:\/\/d3v4eglovri8yt.cloudfront.net\/animation\/66453a3ba2cc5e1b\/actionshop.swf","apiserver":"http:\/\/ga.vyond.com\/","clientThemePath":"https:\/\/d3v4eglovri8yt.cloudfront.net\/static\/55910a7cd204c37c\/<client_theme>","userId":"0TBAAga2Mn6g"});
</script>
<div class="page-container">
<header id="header">
		<a href="/">
			<h1 style="margin:0"><img id="logo" src="/pages/img/list_logo.svg" alt="Wrapper: Offline"/></h1>
		</a>
		<nav id="headbuttons">
			<div class="dropdown_contain button_small">
				<div class="dropdown_button upload_button">UPLOAD</div>
				<nav class="dropdown_menu">
					<a onclick="document.getElementById('file').click()">Movie</a>
					<a onclick="document.getElementById('file2').click()">Character</a>
				</nav>
			</div>	
			<div class="dropdown_contain button_small">
				<div class="dropdown_button">CREATE A CHARACTER</div>
				<nav class="dropdown_menu">
					<h2>Comedy World</h2>
					<a href="/cc?themeId=family&bs=adam">Guy (Adam)</a>
					<a href="/cc?themeId=family&bs=eve">Girl (Eve)</a>
					<a href="/cc?themeId=family&bs=bob">Fat (Bob)</a>
					<a href="/cc?themeId=family&bs=rocky">Buff (Rocky)</a>
					<hr />
					<h2>Anime</h2>
					<a href="/cc?themeId=anime&bs=guy">Guy</a>
					<a href="/cc?themeId=anime&bs=girl">Girl</a>
					<a href="/cc?themeId=ninjaanime&bs=guy">Guy (Ninja)</a>
					<a href="/cc?themeId=ninjaanime&bs=girl">Girl (Ninja)</a>
					<hr />
					<h2>Peepz</h2>
					<a href="/cc?themeId=cc2&bs=default">Lil Peepz</a>
					<a href="/cc?themeId=chibi&bs=default">Chibi Peepz</a>
					<a href="/cc?themeId=ninja&bs=default">Chibi Ninjas</a>
				</nav>
			</div>
			<div class="dropdown_contain button_small">
				<div class="dropdown_button">BROWSE CHARACTERS</div>
				<nav class="dropdown_menu">
					<h2>Comedy World</h2>
					<a href="/cc_browser?themeId=family">Comedy World</a>
					<hr />
					<h2>Anime</h2>
					<a href="/cc_browser?themeId=anime">Anime</a>
					<a href="/cc_browser?themeId=ninjaanime">Ninja Anime</a>
					<hr />
					<h2>Peepz</h2>
					<a href="/cc_browser?themeId=cc2">Lil' Peepz</a>
					<a href="/cc_browser?themeId=chibi">Chibi Peepz</a>
					<a href="/cc_browser?themeId=ninja">Chibi Ninjas</a>
				</nav>
			</div>
			<a href="/go_full" class="button_big">MAKE A VIDEO</a>
		</nav>
	</header>
<div class="container container-cc">
        <ul class="breadcrumb">
	<a href="/go_full">Make a video</a>  >  <a class="active">Your Characters</a>
        </ul>
        <p>Browse characters already available in that theme and use them as a starting point to create new custom characters.</p>
<div id="ccbrowser-container" align="center">${toObjectString(attrs, params)}</div>
<script>
jQuery('#ccbrowser-container').flash({
    id: "ccbrowser",
    swf: "https://localhost:4664/animation/414827163ad4eb60/cc_browser.swf",
    height: 1200,
    width: 960,
    align: "middle",
    allowScriptAccess: "always",
    allowFullScreen: "true",
    wmode: "transparent",
    hasVersion: "10.3",
    flashvars: ${JSON.stringify(params.flashvars)}});
</script>
</div>
<form enctype='multipart/form-data' action='/upload_movie' method='post'>
<input id='file' type="file" onchange="this.form.submit()" name='import' />
</form>
<form enctype='multipart/form-data' action='/upload_character' method='post'>
	<input id='file2' type="file" onchange="this.form.submit()" name='import' />
</form>
<footer>
	<nav id="foot-left">
		<a>v1.2.3½</a>
		<a href="https://localhost:4664/faq.html">FAQ</a>
		<a href="https://discord.gg/yhGAetN">Wrapper Hub</a>
	</nav>
	<nav id="foot-right">
		<a href="https://localhost:4664">Server Page</a>
		<a href="https://localhost:4664/caillou.html">Caillou</a>
	</nav>
</footer>
<div id="studio_container" style="display: none;">
    <div id="studio_holder"><!-- Full Screen Studio -->
        <div style="top: 50%; position: relative;">
            You can't use GoAnimate because Flash might be disabled. <a href="https://get.adobe.com/flashplayer/">Enable Flash</a>.
        </div>
    </div>
</div>
</body>
</html>
<style>
	form {
			display: none;
		}
</style>`
		);
	return true;
}
