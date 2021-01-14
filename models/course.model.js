const db = require('../utils/db')


module.exports = {
	async single(id) {
		const [rows] = await db.query('' +
			'select res2.*, count(s.student_id) as num_student\n' +
			'from(\n' +
			'    select res.*, avg(f.rate) as rate, count(f.rate) as num_rate\n' +
			'    from(\n' +
			'        select c.id, c.title, cat.id as cat_id, cat.title as cat_title, g.fullname, g.email, c.price, c.discount, d.description, d.last_modified, c.ava_link\n' +
			'        from course c, category cat, general_credential g, course_detail d\n' +
			`        where c.id = '${id}' and c.cat_id = cat.id and c.teacher_id = g.id and c.id = d.course_id\n` +
			'    ) as res\n' +
			'    left join student_feedback f on res.id = f.course_id\n' +
			'    group by res.id\n' +
			') as res2\n' +
			'left join student_course s on res2.id = s.course_id\n' +
			'group by res2.id')
		if (rows.length === 0) return null
		return rows[0]
	},

	async syllabus(id) {
		const [rows] = await db.query('' +
			'select *\n' +
			'from course_material m\n' +
			`where m.course_id = '${id}'\n` +
			'order by m.mat_order')
		if (rows.length === 0) return null
		return rows
	},

	async feedback(id) {
		const [rows] = await db.query('' +
			'select f.*, g.fullname\n' +
			'from student_feedback f, general_credential g\n' +
			`where f.course_id = '${id}' and f.student_id = g.id`)
		if (rows.length === 0) return null
		return rows
	},

	async briefMostRegular() {
		const [rows] = await db.query(
			'select *\n' +
			'from\n' +
			'(select res.*, avg(f.rate) as rate, count(f.rate) as num_rate\n' +
			'from\n' +
			'     (\n' +
			'         select c.id, c.title, cat.title as cat_title, g.fullname, c.price, c.discount, c.ava_link, c.total_sub\n' +
			'         from course c, category cat, general_credential g\n' +
			'         where c.cat_id = cat.id and c.teacher_id = g.id\n' +
			'     ) as res\n' +
			'     left join student_feedback f\n' +
			'     on res.id = f.course_id\n' +
			'group by res.id) as `r.*rnr`\n' +
			'order by total_sub desc, rate desc\n' +
			`limit ${+process.env.BRIEF_MOST_REGULAR}`)
		if (rows.length === 0) return null
		return rows
	},

	async briefMostRegularSameCat(id, cat_id) {
		const [rows] = await db.query('' +
			'select *\n' +
			'from(\n' +
			'    select res.*, avg(f.rate) as rate, count(f.rate) as num_rate\n' +
			'\tfrom(\n' +
			'\t\tselect c.id, c.title, cat.title as cat_title, cat.id as cat_id, g.fullname, c.price, c.discount, c.ava_link, c.total_view\n' +
			'\t\tfrom course c, category cat, general_credential g\n' +
			`\t\twhere c.id != '${id}' and c.cat_id = cat.id and c.cat_id = '${cat_id}' and c.teacher_id = g.id\n` +
			'\t) as res\n' +
			'\tleft join student_feedback f\n' +
			'\ton res.id = f.course_id\n' +
			'\tgroup by res.id\n' +
			') as `r.*rnr`\n' +
			'order by total_view desc, rate desc\n' +
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
			'         where c.cat_id = cat.id and c.teacher_id = g.id\n' +
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
			'         where c.cat_id = cat.id and c.teacher_id = g.id and c.id = d.course_id\n' +
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
			'\t\twhere c.cat_id = cat.id and c.teacher_id = g.id\n' +
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
			'\t\twhere c.cat_id = cat.id and c.teacher_id = g.id\n' +
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

	// async pageByCat(condition, pageNum) {
	// 	const [rows] = await db.query('')
	// 	if (rows.length === 0) return null
	// 	return rows
	//
	// 	// '*', 'course', condition, +process.env.PAGINATE, (pageNum - 1) * +process.env.PAGINATE
	// },

	async numByCat(cat_id) {
		const [rows] = await db.query('' +
			'select count(*) as num\n' +
			'\t\tfrom category c, course co\n' +
			`\t\twhere c.id = '${cat_id}' and c.id = co.cat_id\n` +
			'\t\tgroup by c.id')
		if (rows.length === 0) return null
		return rows[0]
	},

	async numPageByCat(condition) {
		const [rows] = await db.load('count(*) as length', 'course', condition)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / process.env.PAGINATE)
	}
}
