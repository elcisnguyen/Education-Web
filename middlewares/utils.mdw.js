function redirectAuth(req, res, next) {
	if (req.session.auth) return res.redirect(req.headers.referrer || '/')
	next()
}

function preventPostAuth(req, res, next) {
	if (!req.session.auth) next()
}


module.exports = { redirectAuth, preventPostAuth }