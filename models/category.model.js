const db = require('../utils/db')


module.exports = {
	async all() {
		const [rows] = await db.load('*', 'category')
		if (rows.length === 0) return null
		return rows
	}
}