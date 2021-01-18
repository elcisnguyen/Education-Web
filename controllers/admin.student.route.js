const express = require('express')
const accountModel = require('../models/account.model')
const Str = require('@supercharge/strings')


const router = express.Router()


router.get('/', async (req, res) => {
	const nPage = await accountModel.numPageStudent()
	const page = Math.min(Math.max(1, req.query.page || 1), nPage)
	res.locals.credentials = await accountModel.pageStudent(page)
	if (res.locals.credentials) res.locals.credentials.forEach(c => {
		c.is_confirmed = c.secret_key === 'OK'
		c.randomID = Str.random()
	})
	res.locals.is_student = true

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
	res.locals.next_page = page + 1
	res.locals.prev_page = page - 1

	res.render('manage-account')
})

router.post('/:username/block', async (req, res) => {
	await accountModel.block(req.params.username)
	return res.json({ status: true })
})

router.post('/:username/unblock', async (req, res) => {
	await accountModel.unblock(req.params.username)
	return res.json({ status: true })
})


module.exports = router