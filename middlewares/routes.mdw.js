const courseModel = require('../models/course.model')
const categoryModel = require('../models/category.model')
const { isAdmin } = require('./utils.mdw')


module.exports = (app) => {
	app.get('/', async (req, res) => {
		res.locals.briefHighlightsPastWeek = await courseModel.briefHighlightsPastWeek()
		res.locals.briefMostViewed = await courseModel.briefMostViewed()
		res.locals.briefNewest = await courseModel.briefNewest()
		res.locals.mostRegisteredCat = await categoryModel.mostRegistered()
		res.render('home')
	})

	app.use('/search', require('../controllers/search.route'))

	app.use('/course', require('../controllers/course.route'))

	app.use('/account', require('../controllers/account.route'))

	app.use('/admin', isAdmin, require('../controllers/admin.route'))

	app.use((req, res) => {
		res.status(404).render('404')
	})
}