const courseModel = require('../models/course.model')
const categoryModel = require('../models/category.model')


module.exports = (app) => {
	app.get('/', async (req, res) => {
		res.locals.briefMostRegular = await courseModel.briefMostRegular()
		res.locals.briefMostViewed = await courseModel.briefMostViewed()
		res.locals.briefNewest = await courseModel.briefNewest()
		res.locals.mostRegistered = await categoryModel.mostRegistered()
		res.render('home')
	})

	app.use('/search', require('../controllers/search.route'))

	app.use('/course', require('../controllers/course.route'))

	app.use('/account', require('../controllers/account.route'))

	app.use((req, res) => {
		res.status(404).render('404')
	})
}