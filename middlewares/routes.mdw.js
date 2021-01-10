module.exports = (app) => {
	app.get('/', (req, res) => {
		res.render('home')
	})

	app.use('/search', require('../controllers/search.route'))

	app.use('/course', require('../controllers/course.route'))

	app.use('/account', require('../controllers/account.route'))

	app.use((req, res) => {
		res.status(404).render('404', { title: '404 Page Not Found' })
	})
}