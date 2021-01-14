const db = require('../utils/db')


module.exports = {
	async single(condition) {
		const [rows] = await db.load('*', 'general_credential', condition)
		if (rows.length === 0) return null
		return rows[0]
	},

	async add(user) {
		const [rows] = await db.insert('general_credential', user)
		return rows
	},

	async singleByEmailExclude(email, id) {
		const [rows] = await db.query('' +
			'select *\n' +
			'from general_credential g\n' +
			`where g.id != '${id}' and g.email = '${email}'`)
		if (rows.length === 0) return null
		return rows[0]
	},

	async singleByUsernameExclude(username, id) {
		const [rows] = await db.query('' +
			'select *\n' +
			'from general_credential g\n' +
			`where g.id != '${id}' and g.username = '${username}'`)
		if (rows.length === 0) return null
		return rows[0]
	},

	async update(id, newUser) {
		const [rows] = await db.query('' +
			`update general_credential set fullname='${newUser.fullname}', email='${newUser.email}', username='${newUser.username}', password='${newUser.password}' where id='${id}'`)
		if (rows.length === 0) return null
		return rows[0]
	},

	async pageWatchlist(id, pageNum) {
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

	async numPageWatchlist(id) {
		const [rows] = await db.query('' +
			'select count(*) as length\n' +
			'from student_watchlist w \n' +
			`where w.student_id = '${id}'`)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / process.env.PAGINATE)
	}
}