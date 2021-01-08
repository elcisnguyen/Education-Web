module.exports = (app) => {
	app.get('/', (req, res) => {
		res.status(200).render('home', { title: 'Schroom | Online Courses' })
	})

	app.use((req, res) => {
		res.status(404).render('404', { title: '404 Page Not Found' })
	})
}