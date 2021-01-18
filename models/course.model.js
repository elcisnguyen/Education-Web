const db = require('../utils/db')
const moment = require('moment')


module.exports = {
	async single(id) {
		const [rows] = await db.query(`
			select res2.*, count(s.student) as num_student
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
					select c.id, c.title, cat.id as cat_id, cat.title as cat_title, g.fullname, g.email, c.final_price, c.discount, c.small_description, c.full_description, c.last_modified, c.ava_link
					from course c, category cat, general_credential g
					where c.id = '${id}' and c.cat_id = cat.id and c.teacher_id = g.username
				) as res
				left join student_feedback f on res.id = f.course_id
				group by res.id
			) as res2
			left join student_course s on res2.id = s.course_id
			group by id
		`)
		if (rows.length === 0) return null
		return rows[0]
	},

	async syllabus(id) {
		const [rows] = await db.query(`
			select *
			from course_material
			where course_id = '${id}'
			order by serial
		`)
		if (rows.length === 0) return null
		return rows
	},

	async feedback(id) {
		const [rows] = await db.query(`
			select f.*, g.fullname
			from student_feedback f, general_credential g
			where f.course_id = '${id}' and f.student_id = g.username
		`)
		if (rows.length === 0) return null
		return rows
	},

	async briefHighlightsPastWeek() {
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
				    select c.id, c.title, cat.title as cat_title, g.fullname, c.final_price, c.discount, c.ava_link, c.total_sub
				    from course c, category cat, general_credential g
				    where c.cat_id = cat.id and c.teacher_id = g.username
				) as res
				left join student_feedback f
				on res.id = f.course_id
				where yearweek(f.date_created) = yearweek(now())
				group by res.id
			) as \`r.*rnr\`
			order by rate desc, total_sub desc
			limit ${+process.env.BRIEF_HIGHLIGHTS_PAST_WEEK}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async briefHighlightsSameCat(id, cat_id) {
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
					select c.id, c.title, cat.title as cat_title, cat.id as cat_id, g.fullname, c.final_price, c.discount, c.ava_link, c.total_sub
					from course c, category cat, general_credential g
					where c.id != '${id}' and c.cat_id = cat.id and c.cat_id = '${cat_id}' and c.teacher_id = g.username
				) as res
				left join student_feedback f on res.id = f.course_id
				group by res.id
			) as \`r.*rnr\`
			order by rate desc, total_sub desc
			limit ${+process.env.BRIEF_HIGHLIGHTS_SAME_CAT}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async briefMostViewed() {
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
				    select c.id, c.title, cat.title as cat_title, g.fullname, c.final_price, c.discount, c.ava_link, c.total_view
				    from course c, category cat, general_credential g
				    where c.cat_id = cat.id and c.teacher_id = g.username
				) as res
				left join student_feedback f
				on res.id = f.course_id
				group by res.id
			) as \`r.*rnr\`
			order by total_view desc, rate desc
			limit ${+process.env.BRIEF_MOST_VIEWED}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async briefNewest() {
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
				    select c.id, c.title, cat.title as cat_title, g.fullname, c.final_price, c.discount, c.ava_link, c.date_created
				    from course c, category cat, general_credential g
				    where c.cat_id = cat.id and c.teacher_id = g.username
				) as res
				left join student_feedback f
				on res.id = f.course_id
				group by res.id
			) as \`r.*rnr\`
			order by date_created desc, rate desc
			limit ${+process.env.BRIEF_NEWEST}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async pageByNameRateOrder(name, pageNum) {
		const offset = Math.max((pageNum - 1) * +process.env.PAGINATE, 0)
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
					select c.id, c.title, cat.title as cat_title, g.fullname, c.final_price, c.discount, c.ava_link, c.total_sub
					from course c, category cat, general_credential g
					where c.cat_id = cat.id and c.teacher_id = g.username and match(c.title) against('${name}*' in boolean mode)
				) as res
				left join student_feedback f on res.id = f.course_id
				group by res.id
			) as \`r.*rnr\`
			order by rate desc, total_sub desc
			limit ${+process.env.PAGINATE} offset ${offset}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async pageByNamePriceOrder(name, pageNum) {
		const offset = (pageNum - 1) * +process.env.PAGINATE
		const [rows] = await db.query(`
			select *
			from(
				select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
				from(
					select c.id, c.title, cat.title as cat_title, g.fullname, c.final_price, c.discount, c.ava_link, c.total_sub
					from course c, category cat, general_credential g
					where c.cat_id = cat.id and c.teacher_id = g.username and match(c.title) against('${name}*' in boolean mode)
				) as res
				left join student_feedback f on res.id = f.course_id
				group by res.id
			) as \`r.*rnr\`
			order by final_price asc, total_sub desc
			limit ${+process.env.PAGINATE} offset ${offset}	
		`)
		if (rows.length === 0) return null
		return rows
	},

	async numPageByName(name) {
		const [rows] = await db.query(`
			select count(*) as length
			from course c
			where match(c.title) against('${name}*' in boolean mode)
		`)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / +process.env.PAGINATE)
	},

	async pageByCatRateOrder(cat_id, pageNum) {
		const offset = (pageNum - 1) * +process.env.PAGINATE
		const [rows] = await db.query(`
			select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
			from(
				select c.id, c.title, cat.title as cat_title, cat.id as cat_id, g.fullname, c.final_price, c.discount, c.ava_link, c.small_description, c.total_sub, c.date_created
				from course c, category cat, general_credential g
				where c.cat_id = cat.id and c.cat_id = '${cat_id}' and c.teacher_id = g.username
			) as res
			left join student_feedback f on res.id = f.course_id
			group by res.id, res.total_sub
			order by rate desc, total_sub desc
			limit ${+process.env.PAGINATE} offset ${offset}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async pageByCatPriceOrder(cat_id, pageNum) {
		const offset = (pageNum - 1) * +process.env.PAGINATE
		const [rows] = await db.query(`
			select res.*, avg(f.rate) as rate, count(f.rate) as num_rate
			from(
				select c.id, c.title, cat.title as cat_title, cat.id as cat_id, g.fullname, c.final_price, c.discount, c.ava_link, c.small_description, c.date_created
				from course c, category cat, general_credential g
				where c.cat_id = cat.id and c.cat_id = '${cat_id}' and c.teacher_id = g.username
			) as res
			left join student_feedback f on res.id = f.course_id
			group by res.id, res.final_price
			order by final_price asc, rate desc
			limit ${+process.env.PAGINATE} offset ${offset}
		`)
		if (rows.length === 0) return null
		return rows
	},

	async numPageByCat(cat_id) {
		const [rows] = await db.query(`
			select count(*) as length
			from course
			where cat_id = '${cat_id}'
		`)
		if (rows.length === 0) return null
		return Math.ceil(rows[0].length / process.env.PAGINATE)
	},

	async addView(id) {
		await db.query(`
			update course set total_view = total_view + 1 where id = '${id}'
		`)
	},

	async addSub(id) {
		await db.query(`
			update course set total_sub = total_sub + 1 where id = '${id}';
		`)
	},

	async removeFromWishlist(course_id, username) {
		await db.query(`
			delete from student_wishlist
			where student = '${username}' and course_id = '${course_id}'
		`)
	},

	async addToWishlist(student, course_id) {
		await db.query(`
			insert into student_wishlist(student, course_id) values('${student}', '${course_id}')
		`)
	},

	async purchase(student, course_id) {
		await db.query(`
			insert into student_course(student, course_id) values('${student}', '${course_id}');
		`)
	},

	async rate(student, course_id, data) {
		await db.query(`
			insert into student_feedback(student_id, course_id, rate, feedback, date_created) values('${student}', '${course_id}', ${data.rate}, '${data.feedback}', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}')
		`)
	}
}
