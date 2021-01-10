const express = require('express')
const accountModel = require('../models/account.model')
const bcrypt = require('bcrypt')


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
	.post(async (req, res) => {
		const user = await accountModel.singleByUsername(req.body.username)
		if (!user)
			return res.render('login', {
				errMessage: 'Invalid username'
			})

		const ret = bcrypt.compareSync(req.body.password, user.password)
		if (ret === false) {
			return res.render('login', {
				errMessage: 'Invalid password'
			})
		}

		// req.session.auth = true
		// req.session.authUser = user
		//
		// const url = req.session.retUrl || '/'
		// res.redirect(url)
	})

router.use('/profile', require('./account.profile.route'))


module.exports = router