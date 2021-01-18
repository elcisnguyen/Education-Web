const express = require('express')


const router = express.Router()


router.use('/student', require('./admin.student.route'))

router.use('/teacher', require('./admin.teacher.route'))

router.use('/course', require('./admin.course.route'))

router.use('/cat', require('./admin.cat.route'))


module.exports = router