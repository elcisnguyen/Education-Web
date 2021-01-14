const express = require('express')


const router = express.Router({ mergeParams: true })

router.route('/')
	.get((req, res) => {
		res.render('profile')
	})
	.post((req, res) => {
		res.send('Post req to edit prrofile')
	})

router.get('/watchlist', (req, res) => {
	res.render('watchlist')
})

router.get('/course', (req, res) => {
	res.render('my-courses')
})


module.exports = router