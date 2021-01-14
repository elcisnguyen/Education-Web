const express = require('express')
const courseModel = require('../models/course.model')


const router = express.Router({ mergeParams: true })


router.route('/:id')
	.get(async (req, res) => {
		res.locals.course = await courseModel.single(req.params.id)
		res.locals.course.last_modified = new Date(res.locals.course.last_modified).toLocaleDateString('en-US')
		res.locals.syllabus = await courseModel.syllabus(req.params.id)
		res.locals.feedback = await courseModel.feedback(req.params.id)
		res.locals.briefMostRegularSameCat = await courseModel.briefMostRegularSameCat(res.locals.course.id, res.locals.course.cat_id)
		console.log(res.locals.briefMostRegularSameCat)
		res.render('course-detail')
	})
	.delete((req, res) => {
		res.send(`Delete req to delete course #${req.params.id}`)
	})

router.route('/:id/watchlist')
	.post((req, res) => {
		res.send(`Post req to add course #${req.params.id} to watchlist`)
	})
	.delete((req, res) => {
		res.send(`Delete req to remove course #${req.params.id} from watchlist`)
	})

router.post('/:id/buy', (req, res) => {
	res.send(`Post req to buy course #${req.params.id}`)
})

router.post('/:id/rate', (req, res) => {
	res.send(`Post req to rate course #${req.params.id}`)
})

router.route('/:id/edit')
	.get((req, res) => {
		res.send(`Edit course #${req.params.id} view`)
	})
	.post((req, res) => {
		res.send(`Post req to edit course #${req.params.id}`)
	})


module.exports = router