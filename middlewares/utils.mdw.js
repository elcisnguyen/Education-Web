function redirectAuth(req, res, next) {
	if (req.session.auth) return res.redirect(req.headers.referrer || '/')
	next()
}

function preventPostAuth(req, res, next) {
	if (!req.session.auth) next()
}

function auth(req, res, next) {
	if (!req.session.auth) {
		req.session.retUrl = req.originalUrl
		return res.redirect('/account/login')
	}
	next()
}


module.exports = { redirectAuth, preventPostAuth, auth }