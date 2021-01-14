const express = require('express')
const courseModel = require('../models/course.model')


const router = express.Router()


router.get('/cat/:id', async (req, res) => {
	const condition = { cat_id: req.params.id }
	const page = Math.min(Math.max(1, req.query.page || 1), await courseModel.numPageByCat(condition))

	res.locals.id = req.params.id
	res.locals.courses = await courseModel.pageByCat(req.params.id, page)
	res.locals.is_empty = res.locals.courses.length === 0

	const nPage = await courseModel.numPageByCat(req.params.id)
	const pageNumbers = []
	for (let i = 1; i <= nPage; ++i) {
		pageNumbers.push({
			value: i,
			isCurrentPage: i === +page
		})
	}
	res.locals.page_numbers = pageNumbers

	// req.query.rate && req.query.price
	res.render('search-result')
})

router.get('/name', (req, res) => {
	res.redirect(`/search/name/${req.query.name}`)
})

router.get('/name/:name', async (req, res) => {
	// req.query.rate && req.query.price
	const booleanCourses = await courseModel.searchBoolean(req.params.name)
	let expansionCourses = await courseModel.searchExpansion(req.params.name) || []

	for (let i = 0; i < expansionCourses.length; ++i)
		for (let j = 0; j < booleanCourses.length; ++j)
			if (expansionCourses[i].id === booleanCourses[j].id) {
				expansionCourses.splice(i, 1)
				break
			}

	res.send({ booleanCourses, expansionCourses })
})


module.exports = router