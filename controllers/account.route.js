const express = require('express')
const accountModel = require('../models/account.model')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')


const router = express.Router()

router.route('/register')
	.get((req, res) => {
		res.render('register')
	})
	.post(async (req, res) => {
		let user = await accountModel.single({ email: req.body.email })
		if (user)
			return res.render('register', {
				err: 'Email already registered, please login instead.',
				fullname: req.body.fullname,
				username: req.body.username
			})

		user = await accountModel.single({ username: req.body.username })
		if (user)
			return res.render('register', {
				err: 'Username already registered, please use another username.',
				fullname: req.body.fullname,
				email: req.body.email
			})

		const hash = bcrypt.hashSync(req.body.password, +process.env.BCRYPT_SALT)
		const newUser = {
			id: uuidv4(),
			permission: 'STUDENT',
			username: req.body.username,
			password: hash,
			fullname: req.body.fullname,
			email: req.body.email,
		}

		await accountModel.add(newUser)
		res.render('home')
	})

router.route('/login')
	.get((req, res) => {
		res.render('login')
	})
	.post(async (req, res) => {
		const user = await accountModel.single({ username: req.body.username })
		if (!user)
			return res.render('login', {
				err: 'Invalid username.'
			})

		if (!bcrypt.compareSync(req.body.password, user.password))
			return res.render('login', {
				err: 'Invalid password.',
				username: req.body.username
			})

		// req.session.auth = true
		// req.session.authUser = user
		//
		// const url = req.session.retUrl || '/'
		// res.redirect(url)

		res.render('home')
	})

router.use('/profile', require('./account.profile.route'))


module.exports = router