const db = require('../utils/db')


module.exports = {
	async all() {
		const [rows] = await db.load('*', 'category')
		if (rows.length === 0) return null
		return rows
	},

	async mostRegistered() {
		const [rows] = await db.query('' +
			'SELECT cat.*, SUM(c.total_sub) AS total_sub\n' +
			'FROM\n' +
			'(\n' +
			'    SELECT c1.id, c1.title, c1.ava_link\n' +
			'    FROM category c1\n' +
			'             LEFT JOIN\n' +
			'         category c2 ON c2.parent_cat_id = c1.id\n' +
			'    WHERE c2.id IS NULL\n' +
			'      AND c1.parent_cat_id IS NOT NULL\n' +
			') cat, course c\n' +
			'WHERE cat.id = c.cat_id\n' +
			'GROUP BY cat.id')
		if (rows.length === 0) return null
		return rows
	}
}