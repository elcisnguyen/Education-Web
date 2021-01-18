const express = require('express')


const router = express.Router()


router.use('/single', require('./course.single.route'))

router.get('/new', (req, res) => {
	res.render('create-new-course')
})

router.post('/new', (req, res) => {
	res.send('Post req to add new course')
})


module.exports = router