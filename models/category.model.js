const db = require('../utils/db')


module.exports = {
	async all() {
		const [rows] = await db.query(`
			select *
			from category
		`)
		if (rows.length === 0) return null
		return rows
	},

	async mostRegistered() {
		const [rows] = await db.query(`
			select *
			from (
				 SELECT cat.*, SUM(c.total_sub) AS total_sub
				 FROM (
					  SELECT c1.id, c1.title, c1.ava_link
					  FROM category c1 LEFT JOIN category c2 ON c2.parent_cat_id = c1.id
					  WHERE c2.id IS NULL AND c1.parent_cat_id IS NOT NULL
				 ) cat, course c
				 WHERE cat.id = c.cat_id
				 GROUP BY cat.id
			) as \`c.*ts\`
			order by total_sub desc
			limit ${+process.env.MOST_REGISTERED}
		`)
		if (rows.length === 0) return null
		return rows
	}
}