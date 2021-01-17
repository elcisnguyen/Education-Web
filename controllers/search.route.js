const express = require('express')
const moment = require('moment')
const courseModel = require('../models/course.model')


const router = express.Router()


router.get('/cat/:id', async (req, res) => {
	const page = Math.min(Math.max(1, req.query.page || 1), await courseModel.numPageByCat(req.params.id))

	if (req.query.sort === 'price') res.locals.courses = await courseModel.pageByCatPriceOrder(req.params.id, page)
	else res.locals.courses = await courseModel.pageByCatRateOrder(req.params.id, page)

	if (res.locals.courses) res.locals.courses.forEach(c => c.is_new = c.date_created > moment().subtract(7, 'days'))

	const nPage = await courseModel.numPageByCat(req.params.id)
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
	res.locals.sort = req.query.sort

	res.render('search-result')
})

router.get('/name/:name', async (req, res) => {
	const page = Math.min(Math.max(1, req.query.page || 1), await courseModel.numPageByName(req.params.name))

	if (req.query.sort === 'price') res.locals.courses = await courseModel.pageByNamePriceOrder(req.params.name, page)
	else res.locals.courses = await courseModel.pageByNameRateOrder(req.params.name, page)

	if (res.locals.courses) res.locals.courses.forEach(c => c.is_new = c.date_created > moment().subtract(7, 'days'))

	const nPage = await courseModel.numPageByName(req.params.name)
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
	res.locals.sort = req.query.sort

	res.render('search-result')
})


module.exports = router