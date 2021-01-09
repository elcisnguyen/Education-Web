const express = require('express')


const router = express.Router()


router.get('/cat/:id', (req, res) => {
	res.send(`${req.params.id} ${req.query.rate} ${req.query.price}`)
	// Render view
})

router.get('/name/:name', (req, res) => {
	res.send(`${req.params.name} ${req.query.rate} ${req.query.price}`)
	// Render view
})


module.exports = router