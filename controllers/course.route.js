const express = require('express')


const router = express.Router()


router.get('/:id', (req, res) => {
	res.send(`View of course detail #${req.params.id}`)
})

router.post('/:id/watchlist', (req, res) => {
	res.send(`Post req to add course #${req.params.id} to watchlist`)
})

router.post('/:id/buy', (req, res) => {
	res.send(`Post req to buy course #${req.params.id}`)
})

router.post('/:id/rate', (req, res) => {
	res.send(`Post req to rate course #${req.params.id}`)
})


module.exports = router