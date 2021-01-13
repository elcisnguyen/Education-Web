const express = require('express')
const accountModel = require('../models/account.model')
const bcrypt = require('bcrypt')
const { redirectAuth, preventPostAuth } = require('../middlewares/utils.mdw')
const { v4: uuidv4 } = require('uuid')


const router = express.Router()

router.route('/register')
	.get(redirectAuth, (req, res) => {
		res.render('register')
	})
	.post(preventPostAuth, async (req, res) => {
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

		req.session.auth = true
		req.session.user = newUser
		delete req.session.user.id
		delete req.session.user.password

		res.redirect(req.session.retUrl || '/')
	})

router.route('/login')
	.get(redirectAuth, (req, res) => {
		res.render('login')
	})
	.post(preventPostAuth, async (req, res) => {
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

		req.session.auth = true
		req.session.user = user
		delete req.session.user.id
		delete req.session.user.password

		res.redirect(req.session.retUrl || '/')
	})

router.use('/profile', require('./account.profile.route'))


module.exports = router