const express = require('express')
const courseModel = require('../models/course.model')
const { isTeacher } = require('../middlewares/utils.mdw')


const router = express.Router()


router.use('/single', require('./course.single.route'))

router.get('/new', isTeacher, async (req, res) => {
	res.locals.subcats = []
	res.locals.categories.forEach(c => {
		if (c.children) c.children.forEach(child => {
			res.locals.subcats.push(child)
		})
	})
	res.render('create-new-course')
})

router.post('/new', isTeacher, async (req, res) => {
	console.info(req.body)
	req.body.teacher_id = req.session.user.username
	await courseModel.addCourse(req.body)
	return res.json({ status: true })
})


module.exports = router