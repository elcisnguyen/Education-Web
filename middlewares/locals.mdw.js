const categoryModel = require('../models/category.model')


module.exports = function (app) {
	app.use(async function (req, res, next) {
		res.locals.user = req.session.user

		const rows = await categoryModel.all()
		if (!rows) next()

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

		res.locals.categories = hierarchy

		next()
	})
}