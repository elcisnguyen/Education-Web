const express = require('express')


const router = express.Router()


router.use('/single', require('./course.single.route'))

router.route('/new')
	.get((req, res) => {
		res.send('New course view')
	})
	.post((req, res) => {
		res.send('Post req to add new course')
	})

module.exports = router