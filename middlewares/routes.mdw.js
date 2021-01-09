module.exports = (app) => {
	app.get('/', (req, res) => {
		res.status(200).render('home', { title: 'Schroom | Online Courses' })
	})

	app.get('/register', (req, res) => {
		res.send('Register')
	})

	app.get('/login', (req, res) => {
		res.send('Login')
	})

	app.use('/search', require('../controllers/search.route'))

	app.use('/course', require('../controllers/course.route'))

	app.use((req, res) => {
		res.status(404).render('404', { title: '404 Page Not Found' })
	})
}