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
	case '/videos/': {
			title = 'Video Player - Vyond';
		attrs = {
				data: process.env.SWF_URL + '/player.swf',
				type: 'application/x-shockwave-flash', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'apiserver': 'http://localhost/', 'storePath': process.env.STORE_URL + '/<store>', 'ut': 60,
					'autostart': 0, 'isWide': 1, 'clientThemePath': process.env.CLIENT_URL + '/<client_theme>',
				},
				allowScriptAccess: 'always',
				allowFullScreen: 'true'
			};
			break;
		}
		default:
			return;
	}
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	Object.assign(params.flashvars, query);
	res.end(
	`<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h3 class="modal-title">Share video</h3>
        </div>
        <div class="modal-body">

            <h4 class="compact">Embed this GoAnimate video on other sites</h4>
            <p>Let users watch this GoAnimate video on other sites using the GoAnimate embedded player.</p>
            <div class="row">
                <div class="col-md-6">
                                            <a class="share-btn gplus gtm-ga-event" rel="tooltip" title="Post your video on Google+" href="https://web.archive.org/web/20180520214854/https://plus.google.com/share?url=https%3A%2F%2Fga.vyond.com%2Fvideos%2F004MdB102ia0%3Futm_source%3Dsocial%26utm_medium%3Dgplus%26utm_campaign%3Dusercontent" data-gtmv-action="Embed - Google+ - Click" data-gtmv-category="" data-gtmv-label="13529187 - Guest" onclick="amplitudeTrackShare(AMPLITUDE_EVENT_PROPERTIES.SHARE_GOOGLE_PLUS); window.open(this.href, '_blank','height=450,width=550,directories=no,menubar=no,scrollbars=yes,status=no,toolbar=no'); return false;"></a>
                        <a class="share-btn facebook gtm-ga-event" rel="tooltip" title="Post your video on Facebook" href="#" data-gtmv-action="Embed - Facebook - Click" data-gtmv-category="" data-gtmv-label="13529187 - Guest" onclick="amplitudeTrackShare(AMPLITUDE_EVENT_PROPERTIES.SHARE_FACEBOOK); FB.ui({method: 'share', href: 'https://web.archive.org/web/20180520214854/https://ga.vyond.com/videos/004MdB102ia0?utm_source=social&amp;utm_medium=facebook&amp;utm_campaign=usercontent'}); return false;"></a>
                        <a class="share-btn pinterest gtm-ga-event" rel="tooltip" title="Post your video on Pinterest" href="//web.archive.org/web/20180520214854/https://pinterest.com/pin/create/button/?url=https%3A%2F%2Fga.vyond.com%2Fvideos%2F004MdB102ia0%3Futm_source%3Dsocial%26utm_medium%3Dpinterest%26utm_campaign%3Dusercontent&amp;media=https%3A%2F%2Fs3.amazonaws.com%2Ffs.goanimate.com%2Ffiles%2Fthumbnails%2Fmovie%2F808%2F123808%2F13529187.jpg&amp;description=Kitchen+Sync" data-gtmv-action="Embed - Pinterest - Click" data-gtmv-category="" data-gtmv-label="13529187 - Guest" onclick="amplitudeTrackShare(AMPLITUDE_EVENT_PROPERTIES.SHARE_PINTEREST); window.open(this.href, '_blank','height=450,width=550,directories=no,menubar=no,scrollbars=yes,status=no,toolbar=no'); return false;"></a>
                                    </div>
                <div class="col-md-6">
                                        <div class="input-group">
                        <span class="input-group-addon">&lt;/&gt;</span>
                        <input class="form-control gtm-ga-event" type="text" value="<iframe scrolling=&quot;no&quot; allowTransparency=&quot;true&quot; allowfullscreen frameborder=&quot;0&quot; width=&quot;640&quot; height=&quot;360&quot; src=&quot;https://ga.vyond.com/player/embed/004MdB102ia0?utm_source=social&amp;utm_medium=tumblr&amp;utm_campaign=usercontent&quot; ></iframe>
" data-gtmv-action="Embed - Click text field" data-gtmv-category="" data-gtmv-label="13529187 - Guest" onclick="amplitudeTrackShare(AMPLITUDE_EVENT_PROPERTIES.SHARE_EMBED); this.focus();this.select()">
                    </div>
                                    </div>
            </div>

            <div class="modal-body-separator"></div>

            <h4 class="compact">Share a link to this GoAnimate video</h4>
            <p>Users clicking this link will watch this video on GoAnimate.</p>
            <div class="row">
                <div class="col-md-6">
                                            <a class="share-btn linkedin gtm-ga-event" rel="tooltip" title="Post a link to your video on Linkedin" href="https://web.archive.org/web/20180520214854/http://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fga.vyond.com%2Fvideos%2F004MdB102ia0%3Futm_source%3Dsocial%26utm_medium%3Dlinkedin%26utm_campaign%3Dusercontent&amp;title=Kitchen+Sync&amp;summary=Demo+product+video+using+business+models.&amp;source=GoAnimate" data-gtmv-action="Share - LinkedIn - Click" data-gtmv-category="" data-gtmv-label="13529187 - Guest" onclick="amplitudeTrackShare(AMPLITUDE_EVENT_PROPERTIES.SHARE_LINKEDIN); window.open(this.href, '_blank','height=570,width=520,directories=no,menubar=no,scrollbars=yes,status=no,toolbar=no'); return false;"></a>
                        <a class="share-btn reddit gtm-ga-event" rel="tooltip" title="Post a link to your video on Reddit" href="https://web.archive.org/web/20180520214854/http://www.reddit.com/submit?url=https%3A%2F%2Fga.vyond.com%2Fvideos%2F004MdB102ia0%3Futm_source%3Dsocial%26utm_medium%3Dreddit%26utm_campaign%3Dusercontent" data-gtmv-action="Share - Reddit - Click" data-gtmv-category="" data-gtmv-label="13529187 - Guest" onclick="amplitudeTrackShare(AMPLITUDE_EVENT_PROPERTIES.SHARE_REDDIT); window.open(this.href, '_blank'); return false;"></a>
                        <a class="share-btn twitter gtm-ga-event" rel="tooltip" title="Post a tweet about your video" href="https://web.archive.org/web/20180520214854/https://twitter.com/share?url=https%3A%2F%2Fga.vyond.com%2Fvideos%2F004MdB102ia0%3Futm_source%3Dsocial%26utm_medium%3Dtwitter%26utm_campaign%3Dusercontent&amp;text=Kitchen+Sync" data-gtmv-action="Share - Twitter - Click" data-gtmv-category="" data-gtmv-label="13529187 - Guest" onclick="amplitudeTrackShare(AMPLITUDE_EVENT_PROPERTIES.SHARE_TWITTER); window.open(this.href, '_blank','height=450,width=550,directories=no,menubar=no,scrollbars=yes,status=no,toolbar=no'); return false;"></a>
                        <a class="share-btn su gtm-ga-event" rel="tooltip" title="Post a link to your video on StumbleUpon" href="https://web.archive.org/web/20180520214854/http://www.stumbleupon.com/submit?url=https%3A%2F%2Fga.vyond.com%2Fvideos%2F004MdB102ia0%3Futm_source%3Dsocial%26utm_medium%3Dstumbleupon%26utm_campaign%3Dusercontent" data-gtmv-action="Share - StumbledUpon - Click" data-gtmv-category="" data-gtmv-label="13529187 - Guest" onclick="amplitudeTrackShare(AMPLITUDE_EVENT_PROPERTIES.SHARE_STUMBLEUPON);"></a>
                        <a class="share-btn tumblr gtm-ga-event" rel="tooltip" title="Post a link to your video on Tumblr" href="https://web.archive.org/web/20180520214854/http://www.tumblr.com/share/video?embed=%3Ciframe+scrolling%3D%22no%22+allowTransparency%3D%22true%22+allowfullscreen+frameborder%3D%220%22+width%3D%22640%22+height%3D%22360%22+src%3D%22https%3A%2F%2Fga.vyond.com%2Fplayer%2Fembed%2F004MdB102ia0%3Futm_source%3Dsocial%26utm_medium%3Dtumblr%26utm_campaign%3Dusercontent%22+%3E%3C%2Fiframe%3E%0A&amp;caption=Demo+product+video+using+business+models." data-gtmv-action="Share - Tumbler - Click" data-gtmv-category="" data-gtmv-label="13529187 - Guest" onclick="amplitudeTrackShare(AMPLITUDE_EVENT_PROPERTIES.SHARE_TUMBLR);"></a>
                                    </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-addon">URL</span>
                        <input class="form-control gtm-ga-event" type="text" value="https://ga.vyond.com/videos/004MdB102ia0?utm_source=linkshare&amp;utm_medium=linkshare&amp;utm_campaign=usercontent" data-gtmv-action="Share - Click text field" data-gtmv-category="" data-gtmv-label="13529187 - Guest" onclick="amplitudeTrackShare(AMPLITUDE_EVENT_PROPERTIES.SHARE_LINK_SHARE); this.focus(); this.select()">
                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer">
            <button class="btn btn-default" type="button" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>`
		);
	return true;
}
