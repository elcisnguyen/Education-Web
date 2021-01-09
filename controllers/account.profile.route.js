const express = require('express')


const router = express.Router({ mergeParams: true })

router.get('/', (req, res) => {
	res.send('Profile view')
})

router.route('/edit')
	.get((req, res) => {
		res.send('Edit profile view')
	})
	.post((req, res) => {
		res.send('Post req to edit prrofile')
	})

router.get('/watchlist', (req, res) => {
	res.send('Show watch list')
})

router.get('/course', (req, res) => {
	res.send('Show bought courses (student) or show owned course (teacher)')
})


module.exports = router