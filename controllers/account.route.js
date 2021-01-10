const express = require('express')


const router = express.Router()

router.route('/register')
	.get((req, res) => {
		res.render('register')
	})
	.post((req, res) => {
		res.send('Post req to register')
	})

router.route('/login')
	.get((req, res) => {
		res.render('login')
	})
	.post((req, res) => {
		res.send('Post req to login')
	})

router.use('/profile', require('./account.profile.route'))


module.exports = router