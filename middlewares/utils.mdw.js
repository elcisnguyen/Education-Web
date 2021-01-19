function isStudent(req, res, next) {
	if (!req.session.user) return res.redirect('/account/login')
	else if (req.session.user.permission !== 'STUDENT') return
	next()
}

function isTeacher(req, res, next) {
	if (!req.session.user) return res.redirect('/account/login')
	else if (req.session.user.permission !== 'TEACHER') return
	next()
}

function isAdmin(req, res, next) {
	if (!req.session.user) return res.redirect('/account/login')
	else if (req.session.user.permission !== 'ADMIN') return
	next()
}

function isAuth(req, res, next) {
	if (!req.session.user) return res.redirect('/account/login')
	next()
}


module.exports = { isStudent, isTeacher, isAdmin, isAuth }