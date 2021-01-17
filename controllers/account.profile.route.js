const express = require('express')
const accountModel = require('../models/account.model')
const bcrypt = require('bcrypt')


const router = express.Router({ mergeParams: true })

router.route('/')
	.get((req, res) => {
		res.render('profile')
	})
	.post(async (req, res) => {
		let user = await accountModel.singleByEmailExclude(req.body.email, req.session.user.id)
		if (user) return res.render('profile', {
			err: 'Email already registered, please use another email address.'
		})

		user = await accountModel.singleByUsernameExclude(req.body.username, req.session.user.id)
		if (user) return res.render('profile', {
			err: 'Username already registered, please use another username.'
		})

		if (!bcrypt.compareSync(req.body.current_password, req.session.user.password)) return res.render('profile', {
			err: 'Invalid password.'
		})

		let newUser

		if (req.body.new_password) {
			if (!req.body.confirm_password) return res.render('profile', {
				err: 'Please confirm your password.'
			})
			else if (req.body.new_password !== req.body.confirm_password) return res.render('profile', {
				err: 'Invalid password.'
			})
			else {
				newUser = {
					fullname: req.body.fullname,
					email: req.body.email,
					username: req.body.username,
					password: bcrypt.hashSync(req.body.new_password, +process.env.BCRYPT_SALT)
				}
			}
		}
		else newUser = {
			fullname: req.body.fullname,
			email: req.body.email,
			username: req.body.username,
		}

		await accountModel.update(req.session.user.id, newUser)

		req.session.user.fullname = newUser.fullname
		req.session.user.email = newUser.email
		req.session.user.username = newUser.username

		if (req.body.new_password) req.session.user.password = newUser.password

		res.redirect('/account/profile')
	})

router.get('/watchlist', async (req, res) => {
	const page = Math.min(Math.max(1, req.query.page || 1), await accountModel.numPageWatchlist(req.session.user.id))
	res.locals.watchlist = await accountModel.pageWatchlist(req.session.user.id, page)

	const nPage = await accountModel.numPageWatchlist(req.session.user.id)
	const pageNumbers = []
	for (let i = 1; i <= nPage; ++i) {
		pageNumbers.push({
			value: i,
			isCurrentPage: i === +page
		})
	}
	res.locals.page_numbers = pageNumbers
	res.locals.is_first = (page === 1)
	res.locals.is_last = (page === nPage)
	res.locals.next_page = +page + 1
	res.locals.prev_page = +page - 1

	res.render('watchlist')
})

router.get('/course', (req, res) => {
	res.render('my-courses')
})

router.get('/course/teaching', (req, res) => {
	res.render('my-teaching')
})


module.exports = router