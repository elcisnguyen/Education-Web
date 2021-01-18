const express = require('express')
const categoryModel = require('../models/category.model')
const { v4: uuidv4 } = require('uuid')


const router = express.Router()


router.get('/', async (req, res) => {
	res.locals.categories.forEach(c => {
		c.cat_name_id = uuidv4()
		c.new_sub_cat_name_id = uuidv4()
		c.new_sub_cat_btn_id = uuidv4()
		c.new_sub_cat_msg_id = uuidv4()
		c.save_btn_id = uuidv4()
		c.save_msg_id = uuidv4()
		if (c.children) c.children.forEach(child => {
			child.sub_cat_name_id = uuidv4()
			child.sub_cat_btn_id = uuidv4()
		})
	})
	res.render('manage-categories')
})

router.post('/check/available/parentcat', async (req, res) => {
	const cat = await categoryModel.singleParentByName(req.body.name)
	if (cat) return res.json({ status: false })
	return res.json({ status: true })
})

router.post('/check/available/subcat', async (req, res) => {
	const cat = await categoryModel.singleSubByName(req.body.name, req.body.parentID)
	if (cat) return res.json({ status: false })
	return res.json({ status: true })
})

router.post('/new', async (req, res) => {
	if (req.body.parentID) await categoryModel.addSubCat(uuidv4(), req.body.name, req.body.parentID)
	else await categoryModel.addParentCat(uuidv4(), req.body.name)
	return res.json({ status: true })
})

router.post('/:id', async (req, res) => {
	console.log(req.body.name)
	console.log(req.body.child)
})


module.exports = router