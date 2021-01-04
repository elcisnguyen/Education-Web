module.exports = (app) => {
	app.get('/', (req, res) => {
		res.status(200).render('home', { title: 'Educational Web' })
	})

	app.use((req, res) => {
		res.status(404).render('404', { title: '404 Page Not Found' })
	})
}