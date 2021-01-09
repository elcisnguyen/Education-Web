const express = require('express')


const router = express.Router()

router.route('/register')
	.get((req, res) => {
		res.send('Register view')
	})
	.post((req, res) => {
		res.send('Post req to register')
	})

router.route('/login')
	.get((req, res) => {
		res.send('Login view')
	})
	.post((req, res) => {
		res.send('Post req to login')
	})

router.use('/profile', require('./account.profile.route'))


module.exports = router