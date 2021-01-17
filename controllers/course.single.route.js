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
	return res.redirect(`/course/single/${req.params.id}`)
})

// router.route('/:id/watchlist/del')
// 	.post(auth, async (req, res) => {
// 		await courseModel.removeFromWatchlist(req.params.id, req.session.user.id)
// 		res.render('watchlist')
// 	})
//
// router.post('/:id/buy', (req, res) => {
// 	res.send(`Post req to buy course #${req.params.id}`)
// })
//
// router.post('/:id/rate', (req, res) => {
// 	res.send(`Post req to rate course #${req.params.id}`)
// })
//
// router.route('/:id/edit')
// 	.get((req, res) => {
// 		res.send(`Edit course #${req.params.id} view`)
// 	})
// 	.post((req, res) => {
// 		res.send(`Post req to edit course #${req.params.id}`)
// 	})


module.exports = router