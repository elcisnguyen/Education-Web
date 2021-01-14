const db = require('../utils/db')


module.exports = {
	async briefMostRegular() {
		const [rows] = await db.query(
			'select *\n' +
			'from\n' +
			'(select res.*, avg(f.rate) as rate, count(f.rate) as num_rate\n' +
			'from\n' +
			'     (\n' +
			'         select c.id, c.title, cat.title as cat_title, g.fullname, c.price, c.discount, c.ava_link, c.total_sub\n' +
			'         from course c, category cat, general_credential g\n' +
			'         where c.status = \'COMPLETE\' and c.cat_id = cat.id and c.teacher_id = g.id\n' +
			'     ) as res\n' +
			'     left join student_feedback f\n' +
			'     on res.id = f.course_id\n' +
			'group by res.id) as `r.*rnr`\n' +
			'order by total_sub desc, rate desc\n' +
			`limit ${+process.env.BRIEF_MOST_REGULAR}`)
		if (rows.length === 0) return null
		return rows
	},

	async briefMostViewed() {
		const [rows] = await db.query(
			'select *\n' +
			'from\n' +
			'(select res.*, avg(f.rate) as rate, count(f.rate) as num_rate\n' +
			'from\n' +
			'     (\n' +
			'         select c.id, c.title, cat.title as cat_title, g.fullname, c.price, c.discount, c.ava_link, c.total_view\n' +
			'         from course c, category cat, general_credential g\n' +
			'         where c.status = \'COMPLETE\' and c.cat_id = cat.id and c.teacher_id = g.id\n' +
			'     ) as res\n' +
			'     left join student_feedback f\n' +
			'     on res.id = f.course_id\n' +
			'group by res.id) as `r.*rnr`\n' +
			'order by total_view desc, rate desc\n' +
			`limit ${+process.env.BRIEF_MOST_VIEW}`)
		if (rows.length === 0) return null
		return rows
	},

	async briefNewest() {
		const [rows] = await db.query(
			'select *\n' +
			'from\n' +
			'(select res.*, avg(f.rate) as rate, count(f.rate) as num_rate\n' +
			'from\n' +
			'     (\n' +
			'         select c.id, c.title, cat.title as cat_title, g.fullname, c.price, c.discount, c.ava_link, d.date_added\n' +
			'         from course c, category cat, general_credential g, course_detail d\n' +
			'         where c.status = \'COMPLETE\' and c.cat_id = cat.id and c.teacher_id = g.id and c.id = d.course_id\n' +
			'     ) as res\n' +
			'     left join student_feedback f\n' +
			'     on res.id = f.course_id\n' +
			'group by res.id) as `r.*rnr`\n' +
			'order by date_added desc, rate desc\n' +
			`limit ${+process.env.BRIEF_NEWEST}`)
		if (rows.length === 0) return null
		return rows
	},

	async searchBoolean(name) {
		const [rows] = await db.query('' +
			'select *\n' +
			'from(\n' +
			'    select res.*, avg(f.rate) as rate, count(f.rate) as num_rate\n' +
			'\tfrom(\n' +
			'\t\tselect c.id, c.title, cat.title as cat_title, g.fullname, c.price, c.discount, c.ava_link, c.total_view\n' +
			'\t\tfrom course c, category cat, general_credential g\n' +
			'\t\twhere c.status = \'COMPLETE\' and c.cat_id = cat.id and c.teacher_id = g.id\n' +
			`\t\t  and match(c.title) against('${name}*' in boolean mode)\n` +
			'\t) as res\n' +
			'\tleft join student_feedback f\n' +
			'\ton res.id = f.course_id\n' +
			'    group by res.id\n' +
			') as `r.*rnr`\n' +
			'order by rate desc, total_view desc')
		if (rows.length === 0) return null
		return rows
	},

	async searchExpansion(name) {
		const [rows] = await db.query('' +
			'select *\n' +
			'from(\n' +
			'    select res.*, avg(f.rate) as rate, count(f.rate) as num_rate\n' +
			'\tfrom(\n' +
			'\t\tselect c.id, c.title, cat.title as cat_title, g.fullname, c.price, c.discount, c.ava_link, c.total_view\n' +
			'\t\tfrom course c, category cat, general_credential g\n' +
			'\t\twhere c.status = \'COMPLETE\' and c.cat_id = cat.id and c.teacher_id = g.id\n' +
			`\t\t  and match(c.title) against('${name}' with query expansion)\n` +
			'\t) as res\n' +
			'\tleft join student_feedback f\n' +
			'\ton res.id = f.course_id\n' +
			'    group by res.id\n' +
			') as `r.*rnr`\n' +
			'order by rate desc, total_view desc')
		if (rows.length === 0) return null
		return rows
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
