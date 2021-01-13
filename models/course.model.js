const db = require('../utils/db')


module.exports = {
	async single(condition) {
		const [rows] = await db.load('*', 'course', condition)
		if (rows.length === 0) return null
		return rows[0]
	},

	async pageByCat(condition, pageNum) {
		const [rows] = await db.loadLimit('*', 'course', condition, +process.env.PAGINATE, (pageNum - 1) * +process.env.PAGINATE)
		if (rows.length === 0) return null
		return rows
	},

	async numPageByCat(condition) {
		const [rows] = await db.load('count(*) as length', 'course', condition)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / process.env.PAGINATE)
	}
}
