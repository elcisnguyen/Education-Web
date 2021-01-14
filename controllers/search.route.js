const express = require('express')
const courseModel = require('../models/course.model')


const router = express.Router()


router.get('/cat/:id', async (req, res) => {
	const condition = { cat_id: req.params.id }
	const page = Math.min(Math.max(1, req.query.page || 1), await courseModel.numPageByCat(condition))

	res.locals.id = req.params.id

	if (req.query.sort === 'price') res.locals.courses = await courseModel.pageByCatPriceOrder(req.params.id, page)
	else res.locals.courses = await courseModel.pageByCatRateOrder(req.params.id, page)

	const nPage = await courseModel.numPageByCat({ cat_id: req.params.id })
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
	res.locals.sort = req.query.sort

	res.render('search-result')
})

router.get('/name', (req, res) => {
	res.redirect(`/search/name/${req.query.name}`)
})

router.get('/name/:name', async (req, res) => {
	const page = Math.min(Math.max(1, req.query.page || 1), await courseModel.numPageByName(req.params.name))

	res.locals.name = req.params.name

	if (req.query.sort === 'price') res.locals.courses = await courseModel.pageByNamePriceOrder(req.params.name, +page)
	else res.locals.courses = await courseModel.pageByNameRateOrder(req.params.name, +page)

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
	res.locals.next_page = +page + 1
	res.locals.prev_page = +page - 1
	res.locals.sort = req.query.sort

	res.render('search-result')
})


module.exports = router