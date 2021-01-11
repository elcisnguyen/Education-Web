const express = require('express')


const router = express.Router({ mergeParams: true })


router.route('/:id')
	.get((req, res) => {
		// res.send(`View of course detail #${req.params.id}`)
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