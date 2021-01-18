const express = require('express')
const courseModel = require('../models/course.model')
const accountModel = require('../models/account.model')
const Str = require('@supercharge/strings')
const { isStudent } = require('../middlewares/utils.mdw')


const router = express.Router({ mergeParams: true })


router.get('/:id', async (req, res) => {
	res.locals.course = await courseModel.single(req.params.id)
	res.locals.course.last_modified = new Date(res.locals.course.last_modified).toLocaleDateString('en-US')
	res.locals.syllabus = await courseModel.syllabus(req.params.id)
	if (res.locals.syllabus) res.locals.syllabus.forEach(e => e.randomID = Str.random())
	res.locals.feedback = await courseModel.feedback(req.params.id)
	if (req.session.user) {
		const wishlist = await accountModel.wishlist(req.session.user.username)
		if (wishlist) wishlist.forEach(e => {
			if (e.course_id === req.params.id) res.locals.is_wished = true
		})

		const purchaseList = await accountModel.purchaseList(req.session.user.username)
		if (purchaseList) purchaseList.forEach(e => {
			if (e.course_id === req.params.id) res.locals.is_purchased = true
		})

		const rateList = await accountModel.rateList(req.session.user.username)
		if (rateList) rateList.forEach(e => {
			if (e.course_id === req.params.id) res.locals.is_rated = true
		})
	}
	res.locals.briefHighlightsSameCat = await courseModel.briefHighlightsSameCat(res.locals.course.id, res.locals.course.cat_id)
	await courseModel.addView(req.params.id)
	res.render('course-detail')
})

// router.delete('/:id', (req, res) => {
// 	res.send(`Delete req to delete course #${req.params.id}`)
// })

router.post('/:id/wishlist', isStudent, async (req, res) => {
	await courseModel.addToWishlist(req.session.user.username, req.params.id)
	return res.json({ status: true })
})

router.delete('/:id/wishlist', async (req, res) => {
	await courseModel.removeFromWishlist(req.params.id, req.session.user.username)
	return res.json({ status: true })
})

router.post('/:id/purchase', isStudent, async (req, res) => {
	await courseModel.purchase(req.session.user.username, req.params.id)
	return res.json({ status: true })
})

router.post('/:id/rate', isStudent, async (req, res) => {
	await courseModel.rate(req.session.user.username, req.params.id, req.body)
	return res.json({ status: true })
})

// router.route('/:id/edit')
// 	.get((req, res) => {
// 		res.send(`Edit course #${req.params.id} view`)
// 	})
// 	.post((req, res) => {
// 		res.send(`Post req to edit course #${req.params.id}`)
// 	})


module.exports = router