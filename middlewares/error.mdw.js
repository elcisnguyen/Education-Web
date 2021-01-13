module.exports = (app) => {
	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, _) => {
		console.error(err.stack)
		res.status(500).render('500', { title: '500 Error Occur' })
	})
}