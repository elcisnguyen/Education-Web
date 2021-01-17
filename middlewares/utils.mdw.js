function isStudent(req, res, next) {
	if (!req.session.user) {
		req.session.returnUrl = req.headers.referer
		return res.redirect('/account/login')
	}
	else if (req.session.user.permission !== 'STUDENT') return
	next()
}

function isTeacher(req, res, next) {
	if (!req.session.user) {
		req.session.returnUrl = req.headers.referer
		return res.redirect('/account/login')
	}
	else if (req.session.user.permission !== 'TEACHER') return
	next()
}

function isAdmin(req, res, next) {
	if (!req.session.user) {
		req.session.returnUrl = req.headers.referer
		return res.redirect('/account/login')
	}
	else if (req.session.user.permission !== 'ADMIN') return
	next()
}


module.exports = { isStudent, isTeacher, isAdmin }