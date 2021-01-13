const categoryModel = require('../models/category.model')


module.exports = function (app) {
	app.use(async function (req, res, next) {
		res.locals.auth = req.session.auth
		res.locals.user = req.session.user

		if (!req.session.categories) {
			const rows = await categoryModel.all()
			const idMapping = rows.reduce((arr, elem, i) => {
				arr[elem.id] = i
				return arr
			}, {})

			let hierarchy = []
			rows.forEach(elem => {
				if (!elem.parent_cat_id) hierarchy.push(elem)
				else {
					const parentEl = rows[idMapping[elem.parent_cat_id]]
					parentEl.children = [...(parentEl.children || []), elem]
				}
			})

			req.session.categories = hierarchy
		}
		res.locals.categories = req.session.categories
		next()
	})
}