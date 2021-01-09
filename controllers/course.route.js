const express = require('express')


const router = express.Router()


router.get('/:id', (req, res) => {
	res.send(`Course detail #${req.params.id}`)
	// Render view
})


module.exports = router