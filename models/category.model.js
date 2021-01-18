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
	},

	async singleParentByName(name) {
		const [rows] = await db.query(`
			select *
			from category
			where parent_cat_id is null and title = '${name}'
		`)
		if (rows.length === 0) return null
		return rows[0]
	},

	async singleSubByName(name, parentID) {
		const [rows] = await db.query(`
			select c1.*
			from category c1 left join category c2 on c2.parent_cat_id = c1.id
			where c2.id is null and c1.parent_cat_id = '${parentID}' and c1.title = '${name}'
		`)
		if (rows.length === 0) return null
		return rows[0]
	},

	async addParentCat(id, name) {
		await db.query(`
			insert into category(id, title)
			values ('${id}', '${name}')
		`)
	},

	async addSubCat(id, name, parentID) {
		await db.query(`
			insert into category(id, title, parent_cat_id)
			values ('${id}', '${name}', '${parentID}')
		`)
	}
}