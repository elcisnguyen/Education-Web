const express = require('express')
const accountModel = require('../models/account.model')
const bcrypt = require('bcrypt')
const mailer = require('../utils/mailer')
const { v4: uuidv4 } = require('uuid')


const router = express.Router()

router.post('/check/exist/username', async (req, res) => {
	let user = await accountModel.singleByUsername(req.body.username)
	if (user) return res.json({ status: true })
	return res.json({ status: false })
})

router.post('/check/exist/email', async (req, res) => {
	let user = await accountModel.singleByEmail(req.body.email)
	if (user) return res.json({ status: true })
	return res.json({ status: false })
})

router.post('/check/correct/password', async (req, res) => {
	const user = await accountModel.singleByUsername(req.body.username)
	if (!bcrypt.compareSync(req.body.password, user.password_hash)) return res.json({ status: false })
	return res.json({ status: true })
})

router.post('/check/verify', async (req, res) => {
	const user = await accountModel.singleByUsername(req.body.username)
	if (user.secret_key !== 'OK') return res.json({ status: false })
	return res.json({ status: true })
})

router.post('/check/block', async (req, res) => {
	const user = await accountModel.singleByUsername(req.body.username)
	if (user.disabled) return res.json({ status: true })
	return res.json({ status: false })
})

router.get('/confirm/:username/:secret_key', async (req, res) => {
	const user = await accountModel.singleByUsername(req.params.username)
	if (!user || user.secret_key !== req.params.secret_key) return res.send('Can not verify.')
	await accountModel.verify(req.params.username)
	return res.send('You are verified.')
})

router.get('/register', (req, res) => {
	res.render('register')
})

router.post('/register', async (req, res) => {
	const hash = bcrypt.hashSync(req.body.password, +process.env.BCRYPT_SALT)
	const user = {
		username: req.body.username,
		permission: 'STUDENT',
		password_hash: hash,
		fullname: req.body.fullname,
		email: req.body.email,
		secret_key: uuidv4()
	}

	if (req.body.verified) {
		user.permission = 'TEACHER'
		user.secret_key = 'OK'
	}

	await accountModel.add(user)

	if (!req.body.verified) {
		const mailOpts = {
			from: process.env.EMAIL_USER,
			to: user.email,
			subject: 'Schroom - Confirm Your Registration',
			text: `Thank you for using Schroom, please copy and paste the link below to your web browser to finish your registration.
\nlocalhost:3000/account/confirm/${user.username}/${user.secret_key}`
		}
		mailer.transporter.sendMail(mailOpts)
			.then(() => console.log('Mail sent successfully to ' + user.email))
			.catch(err => console.log('Error occur when try to send email: ' + err))

		res.redirect('/account/login')
	}
	else return res.json({ status: true})
})

router.get('/login', (req, res) => {
	res.render('login')
})

router.post('/login', async (req, res) => {
	req.session.user = await accountModel.singleByUsername(req.body.username)
	res.redirect(req.session.returnUrl || '/')
})

router.post('/logout', (req, res) => {
	req.session.user = null
	req.session.returnUrl = null
	req.session.destroy()

	res.redirect(req.headers.referer || '/')
})

router.use('/profile', require('./account.profile.route'))


module.exports = router