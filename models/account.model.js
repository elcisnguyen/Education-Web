const db = require('../utils/db')


module.exports = {
	async singleById(id) {
		const [rows] = await db.load('*', 'general_credential', { id })
		if (rows.length === 0)
			return null
		return rows[0]
	},

	async singleByUsername(username) {
		const [rows] = await db.load('*', 'general_credential', { username })
		if (rows.length === 0)
			return null
		return rows[0]
	},

	// async add(user) {
	// 	const [result, fields] = await db.add(user, 'users')
	// 	return result
	// },
}