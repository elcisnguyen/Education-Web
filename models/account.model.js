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
}