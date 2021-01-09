module.exports = (app) => {
	app.get('/', (req, res) => {
		res.render('home', { title: 'Schroom | Online Courses' })
	})

	app.get('/register', (req, res) => {
		res.send('Register')
	})

	app.post('/register', (req, res) => {
		res.send('Post req to register')
	})

	app.get('/login', (req, res) => {
		res.send('Login')
	})

	app.post('/login', (req, res) => {
		res.send('Post req to login')
	})

	app.use('/search', require('../controllers/search.route'))

	app.use('/course', require('../controllers/course.route'))

	app.use('/profile', require('../controllers/profile.route'))

	app.use((req, res) => {
		res.status(404).render('404', { title: '404 Page Not Found' })
	})
}