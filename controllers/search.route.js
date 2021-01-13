const express = require('express')
const courseModel = require('../models/course.model')


const router = express.Router()


router.get('/cat/:id', async (req, res) => {
	const condition = { cat_id: req.params.id }
	const page = Math.min(Math.max(1, req.query.page), await courseModel.numPageByCat(condition))

	const courses = await courseModel.pageByCat(condition, page)

	// req.query.rate && req.query.price
	res.send(courses)
})

router.get('/name', (req, res) => {
	res.redirect(`/search/name/${req.query.name}`)
})

router.get('/name/:name', (req, res) => {
	res.send(`${req.params.name} ${req.query.rate} ${req.query.price}`)
	// Render view
})


module.exports = router