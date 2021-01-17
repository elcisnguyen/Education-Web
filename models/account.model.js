const db = require('../utils/db')


module.exports = {
	async verify(username) {
		await db.query(`
			update general_credential set secret_key = 'OK' where username = '${username}'
		`)
	},

	async singleByUsername(username) {
		const [rows] = await db.query(`
			select * 
			from general_credential
			where username = '${username}'
		`)
		if (rows.length === 0) return null
		return rows[0]
	},

	async singleByEmail(email) {
		const [rows] = await db.query(`
			select * 
			from general_credential
			where email = '${email}'
		`)
		if (rows.length === 0) return null
		return rows[0]
	},

	async add(user) {
		const [rows] = await db.query(`
			insert into general_credential(username, permission, password_hash, fullname, email, secret_key)
			values ('${user.username}', 'STUDENT', '${user.password_hash}', '${user.fullname}', '${user.email}', '${user.secret_key}')
		`)
		return rows
	},

	async update(username, newUser) {
		if (newUser.password) await db.query(`
			update general_credential set fullname='${newUser.fullname}', email='${newUser.email}', password_hash='${newUser.password}' where username='${username}'
		`)
		else await db.query(`
			update general_credential set fullname='${newUser.fullname}', email='${newUser.email}' where username='${username}'
		`)
	},

	async wishlist(username) {
		const [rows] = await db.query(`
			select *
			from student_wishlist
			where student = '${username}'
		`)
		if (rows.length === 0) return null
		return rows
	},

	async purchaseList(username) {
		const [rows] = await db.query(`
			select *
			from student_course
			where student = '${username}'
		`)
		if (rows.length === 0) return null
		return rows
	},

	async pageWishlist(id, pageNum) {
		const offset = Math.max((pageNum - 1) * +process.env.PAGINATE, 0)
		const [rows] = await db.query('' +
			'select *\n' +
			'from(\n' +
			'\tselect res.*, avg(f.rate) as rate, count(f.rate) as num_rate\n' +
			'\tfrom(\n' +
			'\t\tselect c.id, c.title, cat.title as cat_title, g.fullname, c.price, c.discount, c.ava_link\n' +
			'\t\tfrom student_watchlist w, course c, category cat, general_credential g\n' +
			`\t\twhere w.student_id='${id}' and w.course_id = c.id and c.cat_id = cat.id and c.teacher_id = g.id\n` +
			'\t) as res\n' +
			'\tleft join student_feedback f on res.id = f.course_id\n' +
			'\tgroup by res.id\n' +
			') as `r.*rnr`\n' +
			'order by rate desc\n' +
			`limit ${+process.env.PAGINATE} offset ${+offset}`)
		if (rows.length === 0) return null
		return rows
	},

	async numPageWishlist(id) {
		const [rows] = await db.query('' +
			'select count(*) as length\n' +
			'from student_watchlist w \n' +
			`where w.student_id = '${id}'`)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / process.env.PAGINATE)
	}
}