const express = require('express')
const accountModel = require('../models/account.model')
const courseModel = require('../models/course.model')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')


const router = express.Router()


router.get('/', async (req, res) => {
	const nPage = await courseModel.numPageAll()
	const page = Math.min(Math.max(1, req.query.page || 1), nPage)
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

	res.locals.subcats = []
	res.locals.categories.forEach(c => {
		if (c.children) c.children.forEach(child => res.locals.subcats.push(child))
	})
	res.locals.teachers = await accountModel.allTeacher()
	res.locals.courses = await courseModel.pageAll(page)
	if (res.locals.courses) res.locals.courses.forEach(c => {
		c.is_new = c.date_created > moment().subtract(7, 'days')
		c.is_complete = c.status === 'COMPLETE'
		c.randomID = uuidv4()
	})
	res.render('manage-courses')
})

router.post('/:id/block', async (req, res) => {
	await courseModel.block(req.params.id)
	return res.json({ status: true })
})

router.post('/:id/unblock', async (req, res) => {
	await courseModel.unblock(req.params.id)
	return res.json({ status: true })
})


module.exports = router