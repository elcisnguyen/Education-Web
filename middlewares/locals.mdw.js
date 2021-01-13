const categoryModel = require('../models/category.model')


module.exports = function (app) {
	app.use(async function (req, res, next) {
		res.locals.auth = req.session.auth
		res.locals.user = req.session.user

		if (!req.session.categories) req.session.categories = categoryModel.all()
		res.locals.categories = req.session.categories

		next()
	})
}