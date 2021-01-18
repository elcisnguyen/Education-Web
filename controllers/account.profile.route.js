const express = require('express')
const accountModel = require('../models/account.model')
const { isAuth, isStudent } = require('../middlewares/utils.mdw')
const moment = require('moment')
const bcrypt = require('bcrypt')
const Str = require('@supercharge/strings')


const router = express.Router({ mergeParams: true })


router.post('/check/available/email', async (req, res) => {
	if (req.session.user.email === req.body.email) return res.json({ status: true })
	const user = await accountModel.singleByEmail(req.body.email)
	if (user) return res.json({ status: false })
	return res.json({ status: true })
})

router.post('/check/correct/password', async (req, res) => {
	if (!bcrypt.compareSync(req.body.password, req.session.user.password_hash)) return res.json({ status: false })
	return res.json({ status: true })
})

router.get('/', isAuth, (req, res) => {
	res.locals.user = req.session.user
	res.render('profile')
})

router.post('/', async (req, res) => {
	let newUser = {
		fullname: req.body.fullname,
		email: req.body.email,
	}
	if (req.body.new_password) newUser.password = bcrypt.hashSync(req.body.new_password, +process.env.BCRYPT_SALT)

	await accountModel.update(req.session.user.username, newUser)

	req.session.user.fullname = newUser.fullname
	req.session.user.email = newUser.email
	if (req.body.new_password) req.session.user.password = newUser.password

	return res.json({ status: true })
})

router.get('/wishlist', isStudent, async (req, res) => {
	const page = Math.min(Math.max(1, req.query.page || 1), await accountModel.numPageWishlist(req.session.user.username))
	res.locals.wishlist = await accountModel.pageWishlist(req.session.user.username, page)
	if (res.locals.wishlist) res.locals.wishlist.forEach(c => {
		c.is_new = c.date_created > moment().subtract(7, 'days')
		c.randomID = Str.random()
	})

	const nPage = await accountModel.numPageWishlist(req.session.user.username)
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

	res.render('wishlist')
})

router.get('/course', (req, res) => {
	res.render('my-courses')
})

router.get('/course/teaching', (req, res) => {
	res.render('my-teaching')
})


module.exports = router